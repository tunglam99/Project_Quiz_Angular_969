// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000',
    firebaseConfig: {
      apiKey: 'AIzaSyDLbNjWrvQJrg55EnHBiw1VMWvVj9R6k6I',
      authDomain: 'quiz-user-profile.firebaseapp.com',
      databaseURL: 'https://quiz-user-profile.firebaseio.com',
      projectId: 'quiz-user-profile',
      storageBucket: 'quiz-user-profile.appspot.com',
      messagingSenderId: '389952819211',
      appId: '1:389952819211:web:fd79bf5c8b273f8dc9770e',
      measurementId: 'G-BVMGM3D5BH'
    }
  }
;

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
