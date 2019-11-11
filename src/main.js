import LocalStorageDataService from './local-storage-data-service';
import IssuesDataStorage from './issues-data-storage';
import IssuesTemplating from './issues-templating';

// Composition Root
const localStorageDataService = new LocalStorageDataService('issues');
const issuesDataStorage = new IssuesDataStorage(localStorageDataService);
const issuesTemplating = new IssuesTemplating(issuesDataStorage);

window.onload = issuesTemplating.displayIssues.bind(issuesTemplating);
