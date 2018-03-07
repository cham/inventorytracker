import * as NeDB from 'nedb'
import path from 'path'

/* eslint-disable new-cap */
const db = new NeDB.default({
  filename: path.join(__dirname, '../../database.db')
})
/* eslint-enable new-cap */

const getConnection = () => new Promise((resolve, reject) => {
  db.loadDatabase((err) => {
    if (err) {
      return reject(err)
    }
    resolve()
  })
})

export const insert = docs => new Promise((resolve, reject) => {
  getConnection().then(() => {
    db.insert(docs, (err, newDoc) => {
      if (err) {
        return reject(err)
      }
      resolve(newDoc)
    })
  })
  .catch(reject)
})

export const find = filter => new Promise((resolve, reject) => {
  getConnection().then(() => {
    db.find(filter, (err, docs) => {
      if (err) {
        return reject(err)
      }
      resolve(docs)
    })
  })
  .catch(reject)
})

export const findOne = filter => new Promise((resolve, reject) => {
  getConnection().then(() => {
    find(filter)
      .then(docs => resolve(docs[0]))
      .catch(reject)
  })
  .catch(reject)
})

export const patch = (filter, patchSet) => new Promise((resolve, reject) => {
  getConnection().then(() => {
    db.update(filter, { $set: patchSet }, {}, (err, docs) => {
      if (err) {
        return reject(err)
      }
      resolve(docs)
    })
  })
  .catch(reject)
})

export const update = (filter, newDoc) => new Promise((resolve, reject) => {
  getConnection().then(() => {
    db.update(filter, newDoc, {}, (err, docs) => {
      if (err) {
        return reject(err)
      }
      resolve(docs)
    })
  })
  .catch(reject)
})

export const insertOrPatch = (filter, patchSet) => new Promise((resolve, reject) => {
  getConnection().then(() => {
    find(filter)
      .then((results) => {
        if (results && results.length) {
          return patch(filter, patchSet)
            .then(resolve)
            .catch(reject)
        }
        return insert(patchSet)
          .then(resolve)
          .catch(reject)
      })
  })
})

export const remove = (filter) => new Promise((resolve, reject) => {
  getConnection().then(() => {
    db.remove(filter, { multi: true }, function (err) {
      if (err) {
        return reject(err)
      }
      resolve()
    });
  })
})
