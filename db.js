const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
  companies: store.collection('companies'),
  jobs: store.collection('jobs'),
  users: store.collection('users'),
  tableData:store.collection('tableData'),
  // notesData:store.collection('notesData'),
  sentences:store.collection('sentences'),
  sentiments:store.collection('sentiments'),
};
