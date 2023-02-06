import * as extension from "../../src/extension";
import * as vscode from "vscode";
import { Gui } from "@zowe/zowe-explorer-api";
import { ZoweVsCodeExtension, MessageSeverity } from "../../__mocks__/@zowe/zowe-explorer-api";

describe("Extension Unit Tests - function registerFtpApis", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should register the ftp API's", async () => {
        const registerUssApiMock = jest.fn();
        const registerJesApiMock = jest.fn();
        const registerMvsApiMock = jest.fn();

        jest.spyOn(ZoweVsCodeExtension, "getZoweExplorerApi").mockReturnValue({
            registerUssApi: registerUssApiMock,
            registerJesApi: registerJesApiMock,
            registerMvsApi: registerMvsApiMock,
            getExplorerExtenderApi: () => ({
                initForZowe: jest.fn(),
                reloadProfiles: jest.fn(),
            }),
        });

        jest.spyOn(Gui, "showMessage").mockImplementation();
        expect(
            extension.activate({
                subscriptions: [],
                extensionPath: "./test",
            } as vscode.ExtensionContext)
        ).toEqual(undefined);
        expect(registerUssApiMock).toBeCalledTimes(1);
        expect(registerMvsApiMock).toBeCalledTimes(1);
        expect(registerJesApiMock).toBeCalledTimes(1);
    });

    it("should display error if zoweExplorerApi was not found", async () => {
        jest.spyOn(ZoweVsCodeExtension, "getZoweExplorerApi").mockReturnValue(null);
        const showMessageSpy = jest.spyOn(Gui, "showMessage").mockImplementation();
        expect(
            extension.activate({
                subscriptions: [],
                extensionPath: "./test",
            } as vscode.ExtensionContext)
        ).toEqual(undefined);
        expect(showMessageSpy).toBeCalledTimes(1);
    });
});
