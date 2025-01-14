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

export const TheiaLocator = {
    theiaUrl: "http://localhost:3000",

    zoweExplorerxId: "shell-tab-plugin-view-container:zowe",
};

export const DatasetsLocators = {
    datasetTabId: "plugin-view-container:zowe--plugin-view:zowe.ds.explorer",
    datasetTabXpath: "//span[@title='Data Sets']",
    datasetsPanelId: "plugin-view:zowe.ds.explorer",
    datasetsAddSessionId: "zowe.ds.addSession-as-tabbar-toolbar-item",
    emptyInputBoxXpath: "//*[@class='input empty']",
    createNewConnectionListXpath: "//*[@class='monaco-list-row'][1]",
    inputBoxXpath: "//*[@class='input']",
    defaultDatasetsProfileId: "/1:DefaultProfile",
    secondDatasetProfileId: "/2:TestSeleniumProfile",
    favoriteTabId: "/0:Favorites",
    favoriteProfileInDatasetId: "/0:Favorites/0:TestSeleniumProfile",
    addToFavoriteOptionXpath: "//li[@data-command='zowe.ds.saveSearch']",
    searchSymbolInFavoriteXpath: "//*[@id='/0:Favorites/0:TestSeleniumProfile/0:']",
    removeFavoriteProfileFromDatasetsOptionXpath: "//li[@data-command='zowe.ds.removeFavProfile']",
    secondDatasetProfileBeforeDeletingId: "/1:TestSeleniumProfile",
    deleteProfileFromDatasetsXpath: "(//li[@data-command='zowe.ds.deleteProfile'])",
};

export const UssLocators = {
    ussTabId: "plugin-view-container:zowe--plugin-view:zowe.uss.explorer",
    ussTabXpath: "//span[@title='Unix System Services (USS)']",
    ussPanelId: "plugin-view:zowe.uss.explorer",
    ussAddSessionId: "zowe.uss.addSession-as-tabbar-toolbar-item",
    emptyInputBoxXpath: "//*[@class='input empty']",
    defaultUssProfileXpath: "(//div[@id='/1:DefaultProfile'])[2]",
    secondUssProfileXpath: "(//div[@id='/2:TestSeleniumProfile'])[2]",
    favoriteTabXpath: "(//div[@id='/0:Favorites'])[2]",
    favoriteProfileInUssXpath: "(//div[@id='/0:Favorites/0:TestSeleniumProfile'])",
    addToFavoriteOptionXpath: "//li[@data-command='zowe.uss.addFavorite']",
    favoriteProfileInUssBeforeRemovingXpath: "(//div[@id='/0:Favorites/0:TestSeleniumProfile'])",
    removeFavoriteProfileFromUssOptionXpath: "//li[@data-command='zowe.uss.removeFavProfile']",
    hideProfileFromUssOptionXpath: "//li[@data-command='zowe.uss.removeSession']",
    searchSymbolInFavoriteXpath: "//*[@id='/0:Favorites/0:TestSeleniumProfile/0:']",
};

export const JobsLocators = {
    jobTabId: "plugin-view-container:zowe--plugin-view:zowe.jobs.explorer",
    jobTabXpath: "//span[@title='Jobs']",
    jobsPanelId: "zowe.jobs.explorer",
    jobsAddSessionId: "zowe.jobs.addJobsSession-as-tabbar-toolbar-item",
    emptyInputBoxXpath: "//*[@class='input empty']",
    defaultJobsProfileXpath: "(//div[@id='/1:DefaultProfile'])[3]",
    secondJobsProfileXpath: "(//div[@id='/2:TestSeleniumProfile'])[3]",
    favoriteTabXpath: "(//div[@id='/0:Favorites'])[3]",
    favoriteTabAfterRefreshXpath: "(//div[@id='/0:Favorites'])[2]",
    favoriteProfileInJobsXpath: "(//div[@id='/0:Favorites/0:TestSeleniumProfile'])",
    favoriteprofile: "(//div[@id='/0:Favorites/0:TestSeleniumProfile'])",
    addToFavoriteOptionXpath: "//li[@data-command='zowe.jobs.addFavorite']",
    favoriteProfileInJobsBeforeRemovingXpath: "//div[@id='/0:Favorites/0:TestSeleniumProfile/0:Prefix:*']",
    removeFavoriteProfileFromJobsOptionXpath: "//li[@data-command='zowe.jobs.removeFavProfile']",
    hideProfileFromJobsOptionXpath: "//li[@data-command='zowe.jobs.removeJobsSession']",
    secondJobsProfileIdBeforeHidingXpath: "(//div[@id='/2:TestSeleniumProfile'])[2]",
    favoriteprofilexpath: "//div[@id='/0:Favorites/0:TestSeleniumProfile']",
};

export const TheiaNotificationMessages = {
    closeTheiaNotificationWarningMsgXpath: "/html/body/div[3]/div/div[1]/div/div/div/div/ul/li",
    deleteProfileNotificationMsg: "/html/body/div[3]/div/div[1]/div/div/div/div/div[2]/span",
    removeFavoriteProfileConfirmationXpath: `//*[@id="theia-dialog-shell"]/div/div[3]/button[1]`,
};
