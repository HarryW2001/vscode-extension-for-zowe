/*
 * This program and the accompanying materials are made available under the terms of the *
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at *
 * https://www.eclipse.org/legal/epl-v20.html                                      *
 *                                                                                 *
 * SPDX-License-Identifier: EPL-2.0                                                *
 *                                                                                 *
 * Copyright Contributors to the Zowe Project.                                     *
 *                                                                                 *
 */

import * as fs from "fs";
import { imperative } from "@zowe/cli";
import * as globals from "../../../src/globals";
import { KeytarCredentialManager } from "../../../src/security/KeytarCredentialManager";

jest.mock("fs");

describe("KeytarCredentialManager", () => {
    const fakeDisplayName = "Keytar credential manager";
    const scsPluginName = "@zowe/secure-credential-store-for-zowe-cli";

    beforeEach(() => {
        KeytarCredentialManager.keytar = {
            getPassword: jest.fn(),
            setPassword: jest.fn(),
            deletePassword: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should initialize with preset display name", () => {
        const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
        expect((credMgr as any).allServices.length).toBe(5);
        expect((credMgr as any).preferredService).toBe(globals.SETTINGS_SCS_DEFAULT);
    });

    it("should initialize with custom display name", () => {
        const credMgr = new KeytarCredentialManager("test", fakeDisplayName);
        expect((credMgr as any).allServices.length).toBe(6);
        expect((credMgr as any).preferredService).toBe("test");
    });

    describe("getSecurityModules", () => {
        let loggerWarnSpy;

        beforeAll(() => {
            loggerWarnSpy = jest.spyOn(imperative.Logger.prototype, "warn").mockImplementation();
        });

        it("should handle CredentialManager in Imperative settings", () => {
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(true);
            const readFileSyncSpy = jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify({
                    overrides: {
                        CredentialManager: scsPluginName,
                    },
                })
            );
            const keytar = KeytarCredentialManager.getSecurityModules("keytar", false);
            expect(loggerWarnSpy).not.toHaveBeenCalled();
            expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
            expect(Object.keys(keytar as any).length).toBe(5);
        });

        it("should handle credential-manager in Imperative settings", () => {
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(true);
            const readFileSyncSpy = jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify({
                    overrides: {
                        "credential-manager": scsPluginName,
                    },
                })
            );
            const keytar = KeytarCredentialManager.getSecurityModules("keytar", false);
            expect(loggerWarnSpy).not.toHaveBeenCalled();
            expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
            expect(Object.keys(keytar as any).length).toBe(5);
        });

        it("should handle CredentialManager in Imperative settings - Theia", () => {
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(true);
            const readFileSyncSpy = jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify({
                    overrides: {
                        CredentialManager: scsPluginName,
                    },
                })
            );
            jest.spyOn(process, "cwd").mockReturnValueOnce(__dirname + "/../../../../..");
            const keytar = KeytarCredentialManager.getSecurityModules("keytar", true);
            expect(loggerWarnSpy).not.toHaveBeenCalled();
            expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
            expect(Object.keys(keytar as any).length).toBe(5);
        });

        it("should handle empty Imperative settings", () => {
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(true);
            const readFileSyncSpy = jest.spyOn(fs, "readFileSync").mockReturnValue(JSON.stringify({}));
            const keytar = KeytarCredentialManager.getSecurityModules("keytar", false);
            expect(loggerWarnSpy).not.toHaveBeenCalled();
            expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
            expect(keytar).toBeUndefined();
        });

        it("should handle non-existent Imperative settings", () => {
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(false);
            const readFileSyncSpy = jest.spyOn(fs, "readFileSync");
            const keytar = KeytarCredentialManager.getSecurityModules("keytar", false);
            expect(loggerWarnSpy).not.toHaveBeenCalled();
            expect(readFileSyncSpy).not.toHaveBeenCalled();
            expect(keytar).toBeUndefined();
        });

        it("should handle error loading Imperative settings", () => {
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(true);
            const readFileSyncSpy = jest.spyOn(fs, "readFileSync").mockReturnValueOnce("invalid json");
            const keytar = KeytarCredentialManager.getSecurityModules("keytar", false);
            expect(loggerWarnSpy).toHaveBeenCalledTimes(1);
            expect(loggerWarnSpy.mock.calls[0][0].message).toContain("Unexpected token");
            expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
            expect(keytar).toBeUndefined();
        });

        it("should handle error loading invalid security module", () => {
            jest.spyOn(fs, "existsSync").mockReturnValueOnce(true);
            const readFileSyncSpy = jest.spyOn(fs, "readFileSync").mockReturnValue(
                JSON.stringify({
                    overrides: {
                        CredentialManager: scsPluginName,
                    },
                })
            );
            const keytar = KeytarCredentialManager.getSecurityModules("keytar_bad", false);
            expect(loggerWarnSpy).toHaveBeenCalledTimes(2);
            expect(loggerWarnSpy.mock.calls[0][0].message).toContain("Cannot find module");
            expect(readFileSyncSpy).toHaveBeenCalledTimes(1);
            expect(keytar).toBeUndefined();
        });
    });

    describe("deleteCredentials", () => {
        let loggerDebugSpy;

        beforeAll(() => {
            loggerDebugSpy = jest.spyOn(imperative.Logger.prototype, "debug").mockImplementation();
        });

        it("should delete credentials including preferred service", async () => {
            const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
            KeytarCredentialManager.keytar.deletePassword.mockReturnValueOnce(true);
            await (credMgr as any).deleteCredentials("test");
            expect(KeytarCredentialManager.keytar.deletePassword).toHaveBeenCalledTimes(5);
            expect(loggerDebugSpy).not.toHaveBeenCalled();
        });

        it("should not delete missing credentials", async () => {
            const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
            await (credMgr as any).deleteCredentials("test");
            expect(KeytarCredentialManager.keytar.deletePassword).toHaveBeenCalledTimes(5);
            expect(loggerDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerDebugSpy.mock.calls[0][0]).toContain("Unable to delete credentials");
        });
    });

    describe("loadCredentials", () => {
        it("should load credentials successfully", async () => {
            const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
            KeytarCredentialManager.keytar.getPassword.mockReturnValueOnce(null).mockReturnValueOnce("secret");
            const password = await (credMgr as any).loadCredentials("test");
            expect(password).toBe("secret");
            expect(KeytarCredentialManager.keytar.getPassword).toHaveBeenCalledTimes(2);
        });

        it("should fall back to user if username is missing", async () => {
            const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
            KeytarCredentialManager.keytar.getPassword.mockImplementation((service: string, account: string) => {
                return account.endsWith("_user") ? "secret" : null;
            });
            const password = await (credMgr as any).loadCredentials("test_username");
            expect(password).toBe("secret");
            expect(KeytarCredentialManager.keytar.getPassword).toHaveBeenCalledTimes(2);
        });

        it("should fall back to password if pass is missing", async () => {
            const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
            KeytarCredentialManager.keytar.getPassword.mockImplementation((service: string, account: string) => {
                return account.endsWith("_password") ? "secret" : null;
            });
            const password = await (credMgr as any).loadCredentials("test_pass");
            expect(password).toBe("secret");
            expect(KeytarCredentialManager.keytar.getPassword).toHaveBeenCalledTimes(2);
        });

        it("should fail to load missing credentials if required", async () => {
            const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
            let caughtError;
            try {
                await (credMgr as any).loadCredentials("test");
            } catch (error) {
                caughtError = error;
            }
            expect(caughtError).toBeDefined();
            expect(caughtError.message).toContain("Unable to load credentials");
            expect(KeytarCredentialManager.keytar.getPassword).toHaveBeenCalledTimes(5);
        });

        it("should not load missing credentials if optional", async () => {
            const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
            KeytarCredentialManager.keytar.getPassword.mockReturnValue(null);
            const password = await (credMgr as any).loadCredentials("test", true);
            expect(password).toBeNull();
            expect(KeytarCredentialManager.keytar.getPassword).toHaveBeenCalledTimes(5);
        });
    });

    it("saveCredentials should delete old credentials and save new ones", async () => {
        const credMgr = new KeytarCredentialManager(globals.SETTINGS_SCS_DEFAULT, fakeDisplayName);
        await (credMgr as any).saveCredentials("test", "secret");
        expect(KeytarCredentialManager.keytar.deletePassword).toHaveBeenCalledTimes(4);
        expect(KeytarCredentialManager.keytar.setPassword).toHaveBeenCalledTimes(1);
    });
});
