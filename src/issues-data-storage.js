export default class IssuesDataStorage {
  constructor(dataService) {
    this.dataService = dataService;
    this._issues = this.dataService.loadEntities();
  }

  get issues() {
    return this._issues;
  }

  createIssue(issue) {
    if (issue instanceof Object) {
      this._issues.push(issue);
      return this.dataService.addEntity(issue);
    }

    throw new Error('Issue must ba an object');
  }

  changeIssueFieldById(id, key, newValue) {
    if (!id) {
      throw new Error('Id should be passed th change issue');
    }
    if (!key) {
      throw new Error('Key should be passed th change issue');
    }
    const issueToChange = this._issues.find(issue => {
      return issue.id === id;
    });

    if (issueToChange !== undefined) {
      issueToChange[key] = newValue;
      return this.dataService.changeEntity(issueToChange);
    }

    return false;
  }

  dateteIssueById(id) {
    if (!id) {
      throw new Error('Id should be passed th delete issue');
    }
    const indexOfIssueToDelete = this._issues.findIndex(issue => {
      return issue.id === id;
    });

    if (indexOfIssueToDelete > -1) {
      this._issues.splice(indexOfIssueToDelete, 1);
      return this.dataService.dateteEntityById(id);
    }

    return false;
  }
}
