/* eslint no-underscore-dangle: ["error", { "allow": ["_authenticated", "_admin", "_loaded", _uid, "_user", "_db", "_reload"] }] */
/* eslint class-methods-use-this: 0 */

import firebase from 'firebase';
import HttpStatus from 'http-status-codes';
import { fb, googleProvider, userSession } from './firebase';
import utils from './utils';
import { serializeCollection, serialize } from './serializers';

const WAIT_AUTH_TIME = 2000;
const WAIT_DB_TIME = 3500;

let dbRef = null;

class API {
  constructor() {
    this._authenticated = false;
    this._admin = false;
    this._loaded = false;
    this._uid = null;
    this._user = {};
    this._db = {
      artists: {},
      colors: {},
      distributions: {},
      members: {},
      relationships: {},
      songs: {},
      units: {},
      users: {},
    };
    this._reload = {
      artists: true,
      colors: true,
      distributions: true,
      members: true,
      relationships: true,
      songs: true,
      units: true,
      users: true,
    };

    // TO-DO: REMOVE?
    // this.init();
  }

  /**
   * Gets basic information about database
   * @category Getter
   * @returns {Object}
   */
  get state() {
    return {
      admin: this._authenticated ? this._admin : false,
      authenticated: this._authenticated,
      loaded: this._loaded,
      user: this._authenticated ? this._user : {},
    };
  }

  /**
   * Creates a reference to the firebase database and updates api loaded status
   * @category Method
   * @returns {Boolean}
   */
  init() {
    this.print('Initializing database...');

    return new Promise(async (resolve, reject) => {
      dbRef = await fb.database();

      if (dbRef) {
        this._loaded = true;

        // Verify if there is an active previous session for the user
        await this.auth();
        return resolve(this.state);
      }

      const errorMessage = 'Failed to load firebase database';
      this.printError(errorMessage);
      return reject(Error(errorMessage));
    });
  }

  /**
   * Verifies if the users is still logged in from a previous session
   * @category Method
   * @returns {Object} user
   */
  auth() {
    this.print('Running auth...');

    return new Promise(async resolve => {
      if (!this._loaded) {
        await utils.wait(WAIT_AUTH_TIME);
      }

      const { user } = userSession;

      if (user.emailVerified) {
        this._authenticated = true;
        this._uid = user.uid;

        let userResponse = {};

        try {
          userResponse = await this.get(`/users/${user.uid}`);
        } catch (_) {
          userResponse = await this.post(`/users/${user.uid}`);
        }

        userResponse.data.attributes.displayName = user.displayName;
        userResponse.data.attributes.photoURL = user.photoURL;

        this._admin = userResponse.data.attributes.isAdmin;
        this._user = userResponse;
        return resolve(userResponse);
      }
      this._authenticated = false;
      this._uid = null;
      return resolve({});
    });
  }

  async login() {
    this.print('Running login...');

    return new Promise(async (resolve, reject) => {
      let result;

      try {
        await fb.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        result = await fb.auth().signInWithPopup(googleProvider);
      } catch (error) {
        const errorMessage = `Failed to login: ${error.message}`;
        this.printError(errorMessage);
        return reject(Error(errorMessage));
      }

      try {
        const { user } = result;
        if (user.emailVerified) {
          this._authenticated = true;
          this._uid = user.uid;

          let userResponse;
          try {
            userResponse = await this.get(`/users/${user.uid}`);
          } catch (_) {
            userResponse = await this.post(`/users/${user.uid}`);
          }

          userResponse.data.attributes.displayName = user.displayName;
          userResponse.data.attributes.photoURL = user.photoURL;

          this._admin = userResponse.data.attributes.isAdmin;
          result = userResponse;
        }
      } catch (error) {
        const errorMessage = `Failed to login: ${error.message}`;
        this.printError(errorMessage);
        return reject(Error(errorMessage));
      }
      return resolve(result);
    });
  }

  async logoff() {
    // this.print('Running logout...');
    // const response = new NewResponse();
    // try {
    //   await fb.auth().signOut();
    //   this._authenticated = false;
    //   this._uid = null;
    //   response.ok();
    //   response.data(true);
    // } catch (error) {
    //   response.error(error.code, error.message);
    // }
    // return response.resolve();
  }

  /**
   * Prints warning message in the console
   * @category Internal Method
   * @param {String}message the message string
   * @param {String} path the api path
   * @returns undefined
   */
  print(message, path = '') {
    if (process.env.NODE_ENV !== 'test') console.warn(message, path); // eslint-disable-line
  }

  /**
   * Prints error message in the console
   * @category Internal Method
   * @param {String} errorMessage the error message string
   * @returns undefined
   */
  printError(errorMessage) {
    if (process.env.NODE_ENV !== 'test') console.error(errorMessage); // eslint-disable-line
  }

  /**
   * Build error message depending on the API state
   * @category Internal Method
   * @param {String} action the request action type (GET, POST, PATCH, PUT, DELETE)
   * @param {String} errorMessage the error message string
   * @returns {String} error message
   */
  buildErrorMessage(action = '', errorMessage = '') {
    let message = 'API failed with unkown error';

    if (!this._loaded) {
      message = `Unable to perform ${action} action, database is not ready`;
    } else if (!this._authenticated) {
      message = `Unable to perform ${action} action, you are not logged in`;
    } else if (errorMessage) {
      message = `Unable to perform ${action} action: ${errorMessage}`;
    }
    this.printError(message);
    return message;
  }

  // TO-DO: Add resync database function

  /**
   * Gets data from the database based on a path
   * @category Method
   * @param {String} path the error message string
   * @returns undefined
   */
  async get(path) {
    this.print('Fetching data:', path);

    return new Promise(async (resolve, reject) => {
      /*
       * List of possible get calls:
       * /artists
       * /artists/<id>
       */
      let result = {};

      if (!this._loaded || !this._authenticated) {
        await utils.wait(WAIT_DB_TIME);

        if (!this._loaded || !this._authenticated) {
          const errorMessage = this.buildErrorMessage('GET');
          return reject(Error(errorMessage));
        }
      }

      const route = utils.breadcrumble(path);

      switch (route.root) {
        // API/artists
        case 'artists':
          // API/artists/id
          if (route.referenceId) {
            result = await getFunctions.fetchArtist(
              route.referenceId,
              this._db,
              this._reload
            );
          }
          // API/artists
          else {
            result = await getFunctions.fetchArtists(this._db, this._reload);
          }
          break;
        // API/colors
        case 'colors':
          result = await getFunctions.fetchColors(this._db, this._reload);
          break;
        // API/members
        case 'members':
          result = await getFunctions.fetchMembers(this._db, this._reload);
          break;
        // API/users
        case 'users':
          // API/users/<id>
          result = await getFunctions.fetchUser(
            route.referenceId,
            this._db,
            this._reload
          );
          break;
        default:
          return reject(
            Error(`Unable to perform GET action, path ${path} does not exist`)
          );
      }

      // TO-DO: Catch errors in result and reject

      return resolve(result);
    });
  }
}

const getFunctions = {
  // Fetches list of artists
  fetchArtists: async (db, reload) => {
    if (reload.artists === true) {
      let response = {};
      await dbRef.ref(`/artists`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.artists = response;
      reload.artists = false;
    }
    return serializeCollection(db.artists, 'artist', true, 'name');
  },
  // Fetches a single artist
  fetchArtist: async (id, db, reload) => {
    if (db.artists[id] === undefined || reload.artists === true) {
      let response = {};
      await dbRef.ref(`/artists/${id}`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.artists[id] = response;
    }
    return serialize(db.artists[id], id, 'artist');
  },
  // Fetches list of colors
  fetchColors: async (db, reload) => {
    if (reload.colors === true) {
      let response = {};
      await dbRef.ref(`/colors`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.colors = response;
      reload.colors = false;
    }
    return serializeCollection(db.colors, 'color', true);
  },
  // Fetches list of artists
  fetchMembers: async (db, reload) => {
    if (reload.members === true) {
      let response = {};
      await dbRef.ref(`/members`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.members = response;
      reload.members = false;
    }
    return serializeCollection(db.members, 'member', true, 'name');
  },
  // Fetches a single user
  fetchUser: async (id, db, reload) => {
    if (db.users[id] === undefined || reload.artists === true) {
      let response = {};
      await dbRef.ref(`/users/${id}`).once('value', snapshot => {
        response = snapshot.val();
      });
      db.users[id] = response;
    }
    return serialize(db.users[id], id, 'user');
  },
};

export default new API();