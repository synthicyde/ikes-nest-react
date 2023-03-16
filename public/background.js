console.log("Ike's Nest Loaded");

// Links for init
const initCareLinks = [
	{
		"ArticleName" : "Adding and Editing Fields",
		"ArticleURL" : "https://care.icims.com/s/article/Adding-and-Editing-Fields",
		"target" : "_blank"
	},
	{
		"ArticleName" : "Common Definitions of User Licenses",
		"ArticleURL" : "https://care.icims.com/s/article/Common-Definitions-of-User-Licenses-and-User-Groups",
		"target" : "_blank"
	},
	{
		"ArticleName" : "Auto-Sourcing",
		"ArticleURL" : "https://care.icims.com/s/article/Creating-Links-to-Auto-Fill-Candidate-Source-Fields",
		"target" : "_blank"
	},
	{
		"ArticleName" : "Configuring Office 365",
		"ArticleURL" : "https://care.icims.com/s/article/Configuring-Calendar-Integration",
		"target" : "_blank"
	},
	{
		"ArticleName" : "IP and Domains to Allow",
		"ArticleURL" : "https://care.icims.com/s/article/iCIMS-IP-Addresses-and-Domains-to-Allow",
		"target" : "_blank"
	},
	{
		"ArticleName" : "Searching & Reporting Curriculum",
		"ArticleURL" : "https://care.icims.com/s/article/Searching-Reporting-Curriculum",
		"target" : "_blank"
	},
	{
		"ArticleName" : "Setting Up the Connector for LinkedIn RSC",
		"ArticleURL" : "https://care.icims.com/s/article/Setting-Up-the-Connector-for-LinkedIn-Recruiter-System-Connect",
		"target" : "_blank"
	}
];

const initBookingsLink = {
	link: ""
};

const initPortalPass = {
	password: ""
};

function initCareLinksSync() {
	chrome.storage.sync.set({"storedUserLinks": initCareLinks});
};

function initBookingsLinkSync() {
	chrome.storage.sync.set({"storedUserBookings": initBookingsLink});
};

function initPortalPassSync() {
	chrome.storage.sync.set({"storedUserPortalPass": initPortalPass});
};

function initInstallFlag() {
	chrome.storage.sync.set({"alreadyInstalled": true});
}

chrome.runtime.onInstalled.addListener(() => {
	console.log("Ike's nest has been built on a branch.");
	chrome.storage.sync.get(["alreadyInstalled"], function(result) {
		if (result.alreadyInstalled === undefined) {
			initCareLinksSync();
			initBookingsLinkSync();
			initPortalPassSync();
			initInstallFlag();
		}
	});
});