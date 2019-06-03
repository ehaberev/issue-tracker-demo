/* global chance */
import { saveIssueToLocalStorage, setIssueStatusClosed, deleteIssueFromLocalStorage } from 'package-temp';

window.addEventListener('load', fetchIssues);
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  saveIssueToLocalStorage(issueId, issueDesc, issueSeverity, issueAssignedTo, issueStatus);

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

// eslint-disable-next-line no-unused-vars
function setStatusClosed(id) {
  setIssueStatusClosed(id);

  fetchIssues();
}

// eslint-disable-next-line no-unused-vars
function deleteIssue(id) {
  deleteIssueFromLocalStorage(id);
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (let i = 0; i < issues.length; i++) {

    let id = issues[i].id;
    let desc = issues[i].description;
    let severity = issues[i].severity;
    let assignedTo = issues[i].assignedTo;
    let status = issues[i].status;

    let div = document.createElement('div');
    div.className = 'well';
    let h6 = document.createElement('h6');
    let h6Inner = document.createTextNode('Issue ID: ' + id);
    h6.appendChild(h6Inner);
    div.appendChild(h6);
    let p1 = document.createElement('p');
    let span1 = document.createElement('span');
    span1.className = 'label label-info';
    let span1Inner = document.createTextNode(status);
    span1.appendChild(span1Inner);
    p1.appendChild(span1);
    div.appendChild(p1);
    let h3 = document.createElement('h3');
    let h3Inner = document.createTextNode(desc);
    h3.appendChild(h3Inner);
    div.appendChild(h3);
    let p2 = document.createElement('p');
    let span2 = document.createElement('span');
    span2.className = 'glyphicon glyphicon-time';
    p2.appendChild(span2);
    let p2Inner = document.createTextNode(' ' + severity);
    p2.appendChild(p2Inner);
    div.appendChild(p2);
    let p3 = document.createElement('p');
    let span3 = document.createElement('span');
    span3.className = 'glyphicon glyphicon-user';
    p3.appendChild(span3);
    let p3Inner = document.createTextNode(' ' + assignedTo);
    p3.appendChild(p3Inner);
    div.appendChild(p3);
    let a1 = document.createElement('a');
    a1.setAttribute('href', '#');
    a1.className = 'btn btn-warning';
    let a1Inner = document.createTextNode('Close');
    a1.appendChild(a1Inner);
    a1.addEventListener('click', () => { setStatusClosed(id); });
    div.appendChild(a1);
    let a2 = document.createElement('a');
    a2.setAttribute('href', '#');
    a2.className = 'btn btn-danger';
    let a2Inner = document.createTextNode('Delete');
    a2.appendChild(a2Inner);
    a2.addEventListener('click', () => { deleteIssue(id); });
    div.appendChild(a2);
    issuesList.appendChild(div);
  }
}
