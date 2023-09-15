exports.id = "component---src-pages-search-js";
exports.ids = ["component---src-pages-search-js"];
exports.modules = {

/***/ "./node_modules/@algolia/cache-common/dist/cache-common.esm.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@algolia/cache-common/dist/cache-common.esm.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createFallbackableCache: () => (/* binding */ createFallbackableCache),
/* harmony export */   createNullCache: () => (/* binding */ createNullCache)
/* harmony export */ });
// @todo Add logger on options to debug when caches go wrong.
function createFallbackableCache(options) {
    const caches = [...options.caches];
    const current = caches.shift(); // eslint-disable-line functional/immutable-data
    if (current === undefined) {
        return createNullCache();
    }
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            return current.get(key, defaultValue, events).catch(() => {
                return createFallbackableCache({ caches }).get(key, defaultValue, events);
            });
        },
        set(key, value) {
            return current.set(key, value).catch(() => {
                return createFallbackableCache({ caches }).set(key, value);
            });
        },
        delete(key) {
            return current.delete(key).catch(() => {
                return createFallbackableCache({ caches }).delete(key);
            });
        },
        clear() {
            return current.clear().catch(() => {
                return createFallbackableCache({ caches }).clear();
            });
        },
    };
}

function createNullCache() {
    return {
        get(_key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            const value = defaultValue();
            return value
                .then(result => Promise.all([result, events.miss(result)]))
                .then(([result]) => result);
        },
        set(_key, value) {
            return Promise.resolve(value);
        },
        delete(_key) {
            return Promise.resolve();
        },
        clear() {
            return Promise.resolve();
        },
    };
}




/***/ }),

/***/ "./node_modules/@algolia/cache-in-memory/dist/cache-in-memory.esm.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@algolia/cache-in-memory/dist/cache-in-memory.esm.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createInMemoryCache: () => (/* binding */ createInMemoryCache)
/* harmony export */ });
function createInMemoryCache(options = { serializable: true }) {
    // eslint-disable-next-line functional/no-let
    let cache = {};
    return {
        get(key, defaultValue, events = {
            miss: () => Promise.resolve(),
        }) {
            const keyAsString = JSON.stringify(key);
            if (keyAsString in cache) {
                return Promise.resolve(options.serializable ? JSON.parse(cache[keyAsString]) : cache[keyAsString]);
            }
            const promise = defaultValue();
            const miss = (events && events.miss) || (() => Promise.resolve());
            return promise.then((value) => miss(value)).then(() => promise);
        },
        set(key, value) {
            // eslint-disable-next-line functional/immutable-data
            cache[JSON.stringify(key)] = options.serializable ? JSON.stringify(value) : value;
            return Promise.resolve(value);
        },
        delete(key) {
            // eslint-disable-next-line functional/immutable-data
            delete cache[JSON.stringify(key)];
            return Promise.resolve();
        },
        clear() {
            cache = {};
            return Promise.resolve();
        },
    };
}




/***/ }),

/***/ "./node_modules/@algolia/client-analytics/dist/client-analytics.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@algolia/client-analytics/dist/client-analytics.esm.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addABTest: () => (/* binding */ addABTest),
/* harmony export */   createAnalyticsClient: () => (/* binding */ createAnalyticsClient),
/* harmony export */   deleteABTest: () => (/* binding */ deleteABTest),
/* harmony export */   getABTest: () => (/* binding */ getABTest),
/* harmony export */   getABTests: () => (/* binding */ getABTests),
/* harmony export */   stopABTest: () => (/* binding */ stopABTest)
/* harmony export */ });
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/client-common.esm.js");
/* harmony import */ var _algolia_transporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/transporter */ "./node_modules/@algolia/transporter/dist/transporter.esm.js");
/* harmony import */ var _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @algolia/requester-common */ "./node_modules/@algolia/requester-common/dist/requester-common.esm.js");




const createAnalyticsClient = options => {
    const region = options.region || 'us';
    const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.createAuth)(_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.AuthMode.WithinHeaders, options.appId, options.apiKey);
    const transporter = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
        hosts: [{ url: `analytics.${region}.algolia.com` }],
        ...options,
        headers: {
            ...auth.headers(),
            ...{ 'content-type': 'application/json' },
            ...options.headers,
        },
        queryParameters: {
            ...auth.queryParameters(),
            ...options.queryParameters,
        },
    });
    const appId = options.appId;
    return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.addMethods)({ appId, transporter }, options.methods);
};

const addABTest = (base) => {
    return (abTest, requestOptions) => {
        return base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__.MethodEnum.Post,
            path: '2/abtests',
            data: abTest,
        }, requestOptions);
    };
};

const deleteABTest = (base) => {
    return (abTestID, requestOptions) => {
        return base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__.MethodEnum.Delete,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.encode)('2/abtests/%s', abTestID),
        }, requestOptions);
    };
};

const getABTest = (base) => {
    return (abTestID, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.encode)('2/abtests/%s', abTestID),
        }, requestOptions);
    };
};

const getABTests = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__.MethodEnum.Get,
            path: '2/abtests',
        }, requestOptions);
    };
};

const stopABTest = (base) => {
    return (abTestID, requestOptions) => {
        return base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.encode)('2/abtests/%s/stop', abTestID),
        }, requestOptions);
    };
};




/***/ }),

/***/ "./node_modules/@algolia/client-common/dist/client-common.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@algolia/client-common/dist/client-common.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthMode: () => (/* binding */ AuthMode),
/* harmony export */   addMethods: () => (/* binding */ addMethods),
/* harmony export */   createAuth: () => (/* binding */ createAuth),
/* harmony export */   createRetryablePromise: () => (/* binding */ createRetryablePromise),
/* harmony export */   createWaitablePromise: () => (/* binding */ createWaitablePromise),
/* harmony export */   destroy: () => (/* binding */ destroy),
/* harmony export */   encode: () => (/* binding */ encode),
/* harmony export */   shuffle: () => (/* binding */ shuffle),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
function createAuth(authMode, appId, apiKey) {
    const credentials = {
        'x-algolia-api-key': apiKey,
        'x-algolia-application-id': appId,
    };
    return {
        headers() {
            return authMode === AuthMode.WithinHeaders ? credentials : {};
        },
        queryParameters() {
            return authMode === AuthMode.WithinQueryParameters ? credentials : {};
        },
    };
}

function createRetryablePromise(callback) {
    let retriesCount = 0; // eslint-disable-line functional/no-let
    const retry = () => {
        retriesCount++;
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(callback(retry));
            }, Math.min(100 * retriesCount, 1000));
        });
    };
    return callback(retry);
}

function createWaitablePromise(promise, wait = (_response, _requestOptions) => {
    return Promise.resolve();
}) {
    // eslint-disable-next-line functional/immutable-data
    return Object.assign(promise, {
        wait(requestOptions) {
            return createWaitablePromise(promise
                .then(response => Promise.all([wait(response, requestOptions), response]))
                .then(promiseResults => promiseResults[1]));
        },
    });
}

// eslint-disable-next-line functional/prefer-readonly-type
function shuffle(array) {
    let c = array.length - 1; // eslint-disable-line functional/no-let
    // eslint-disable-next-line functional/no-loop-statement
    for (c; c > 0; c--) {
        const b = Math.floor(Math.random() * (c + 1));
        const a = array[c];
        array[c] = array[b]; // eslint-disable-line functional/immutable-data, no-param-reassign
        array[b] = a; // eslint-disable-line functional/immutable-data, no-param-reassign
    }
    return array;
}
function addMethods(base, methods) {
    if (!methods) {
        return base;
    }
    Object.keys(methods).forEach(key => {
        // eslint-disable-next-line functional/immutable-data, no-param-reassign
        base[key] = methods[key](base);
    });
    return base;
}
function encode(format, ...args) {
    // eslint-disable-next-line functional/no-let
    let i = 0;
    return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}

const version = '4.14.2';

const destroy = (base) => {
    return () => {
        return base.transporter.requester.destroy();
    };
};

const AuthMode = {
    /**
     * If auth credentials should be in query parameters.
     */
    WithinQueryParameters: 0,
    /**
     * If auth credentials should be in headers.
     */
    WithinHeaders: 1,
};




/***/ }),

/***/ "./node_modules/@algolia/client-personalization/dist/client-personalization.esm.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/@algolia/client-personalization/dist/client-personalization.esm.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createPersonalizationClient: () => (/* binding */ createPersonalizationClient),
/* harmony export */   getPersonalizationStrategy: () => (/* binding */ getPersonalizationStrategy),
/* harmony export */   setPersonalizationStrategy: () => (/* binding */ setPersonalizationStrategy)
/* harmony export */ });
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/client-common.esm.js");
/* harmony import */ var _algolia_transporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/transporter */ "./node_modules/@algolia/transporter/dist/transporter.esm.js");
/* harmony import */ var _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @algolia/requester-common */ "./node_modules/@algolia/requester-common/dist/requester-common.esm.js");




const createPersonalizationClient = options => {
    const region = options.region || 'us';
    const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.createAuth)(_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.AuthMode.WithinHeaders, options.appId, options.apiKey);
    const transporter = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_1__.createTransporter)({
        hosts: [{ url: `personalization.${region}.algolia.com` }],
        ...options,
        headers: {
            ...auth.headers(),
            ...{ 'content-type': 'application/json' },
            ...options.headers,
        },
        queryParameters: {
            ...auth.queryParameters(),
            ...options.queryParameters,
        },
    });
    return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_0__.addMethods)({ appId: options.appId, transporter }, options.methods);
};

const getPersonalizationStrategy = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__.MethodEnum.Get,
            path: '1/strategies/personalization',
        }, requestOptions);
    };
};

const setPersonalizationStrategy = (base) => {
    return (personalizationStrategy, requestOptions) => {
        return base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_2__.MethodEnum.Post,
            path: '1/strategies/personalization',
            data: personalizationStrategy,
        }, requestOptions);
    };
};




/***/ }),

/***/ "./node_modules/@algolia/client-search/dist/client-search.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@algolia/client-search/dist/client-search.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiKeyACLEnum: () => (/* binding */ ApiKeyACLEnum),
/* harmony export */   BatchActionEnum: () => (/* binding */ BatchActionEnum),
/* harmony export */   ScopeEnum: () => (/* binding */ ScopeEnum),
/* harmony export */   StrategyEnum: () => (/* binding */ StrategyEnum),
/* harmony export */   SynonymEnum: () => (/* binding */ SynonymEnum),
/* harmony export */   addApiKey: () => (/* binding */ addApiKey),
/* harmony export */   assignUserID: () => (/* binding */ assignUserID),
/* harmony export */   assignUserIDs: () => (/* binding */ assignUserIDs),
/* harmony export */   batch: () => (/* binding */ batch),
/* harmony export */   browseObjects: () => (/* binding */ browseObjects),
/* harmony export */   browseRules: () => (/* binding */ browseRules),
/* harmony export */   browseSynonyms: () => (/* binding */ browseSynonyms),
/* harmony export */   chunkedBatch: () => (/* binding */ chunkedBatch),
/* harmony export */   clearDictionaryEntries: () => (/* binding */ clearDictionaryEntries),
/* harmony export */   clearObjects: () => (/* binding */ clearObjects),
/* harmony export */   clearRules: () => (/* binding */ clearRules),
/* harmony export */   clearSynonyms: () => (/* binding */ clearSynonyms),
/* harmony export */   copyIndex: () => (/* binding */ copyIndex),
/* harmony export */   copyRules: () => (/* binding */ copyRules),
/* harmony export */   copySettings: () => (/* binding */ copySettings),
/* harmony export */   copySynonyms: () => (/* binding */ copySynonyms),
/* harmony export */   createBrowsablePromise: () => (/* binding */ createBrowsablePromise),
/* harmony export */   createMissingObjectIDError: () => (/* binding */ createMissingObjectIDError),
/* harmony export */   createObjectNotFoundError: () => (/* binding */ createObjectNotFoundError),
/* harmony export */   createSearchClient: () => (/* binding */ createSearchClient),
/* harmony export */   createValidUntilNotFoundError: () => (/* binding */ createValidUntilNotFoundError),
/* harmony export */   customRequest: () => (/* binding */ customRequest),
/* harmony export */   deleteApiKey: () => (/* binding */ deleteApiKey),
/* harmony export */   deleteBy: () => (/* binding */ deleteBy),
/* harmony export */   deleteDictionaryEntries: () => (/* binding */ deleteDictionaryEntries),
/* harmony export */   deleteIndex: () => (/* binding */ deleteIndex),
/* harmony export */   deleteObject: () => (/* binding */ deleteObject),
/* harmony export */   deleteObjects: () => (/* binding */ deleteObjects),
/* harmony export */   deleteRule: () => (/* binding */ deleteRule),
/* harmony export */   deleteSynonym: () => (/* binding */ deleteSynonym),
/* harmony export */   exists: () => (/* binding */ exists),
/* harmony export */   findAnswers: () => (/* binding */ findAnswers),
/* harmony export */   findObject: () => (/* binding */ findObject),
/* harmony export */   generateSecuredApiKey: () => (/* binding */ generateSecuredApiKey),
/* harmony export */   getApiKey: () => (/* binding */ getApiKey),
/* harmony export */   getAppTask: () => (/* binding */ getAppTask),
/* harmony export */   getDictionarySettings: () => (/* binding */ getDictionarySettings),
/* harmony export */   getLogs: () => (/* binding */ getLogs),
/* harmony export */   getObject: () => (/* binding */ getObject),
/* harmony export */   getObjectPosition: () => (/* binding */ getObjectPosition),
/* harmony export */   getObjects: () => (/* binding */ getObjects),
/* harmony export */   getRule: () => (/* binding */ getRule),
/* harmony export */   getSecuredApiKeyRemainingValidity: () => (/* binding */ getSecuredApiKeyRemainingValidity),
/* harmony export */   getSettings: () => (/* binding */ getSettings),
/* harmony export */   getSynonym: () => (/* binding */ getSynonym),
/* harmony export */   getTask: () => (/* binding */ getTask),
/* harmony export */   getTopUserIDs: () => (/* binding */ getTopUserIDs),
/* harmony export */   getUserID: () => (/* binding */ getUserID),
/* harmony export */   hasPendingMappings: () => (/* binding */ hasPendingMappings),
/* harmony export */   initIndex: () => (/* binding */ initIndex),
/* harmony export */   listApiKeys: () => (/* binding */ listApiKeys),
/* harmony export */   listClusters: () => (/* binding */ listClusters),
/* harmony export */   listIndices: () => (/* binding */ listIndices),
/* harmony export */   listUserIDs: () => (/* binding */ listUserIDs),
/* harmony export */   moveIndex: () => (/* binding */ moveIndex),
/* harmony export */   multipleBatch: () => (/* binding */ multipleBatch),
/* harmony export */   multipleGetObjects: () => (/* binding */ multipleGetObjects),
/* harmony export */   multipleQueries: () => (/* binding */ multipleQueries),
/* harmony export */   multipleSearchForFacetValues: () => (/* binding */ multipleSearchForFacetValues),
/* harmony export */   partialUpdateObject: () => (/* binding */ partialUpdateObject),
/* harmony export */   partialUpdateObjects: () => (/* binding */ partialUpdateObjects),
/* harmony export */   removeUserID: () => (/* binding */ removeUserID),
/* harmony export */   replaceAllObjects: () => (/* binding */ replaceAllObjects),
/* harmony export */   replaceAllRules: () => (/* binding */ replaceAllRules),
/* harmony export */   replaceAllSynonyms: () => (/* binding */ replaceAllSynonyms),
/* harmony export */   replaceDictionaryEntries: () => (/* binding */ replaceDictionaryEntries),
/* harmony export */   restoreApiKey: () => (/* binding */ restoreApiKey),
/* harmony export */   saveDictionaryEntries: () => (/* binding */ saveDictionaryEntries),
/* harmony export */   saveObject: () => (/* binding */ saveObject),
/* harmony export */   saveObjects: () => (/* binding */ saveObjects),
/* harmony export */   saveRule: () => (/* binding */ saveRule),
/* harmony export */   saveRules: () => (/* binding */ saveRules),
/* harmony export */   saveSynonym: () => (/* binding */ saveSynonym),
/* harmony export */   saveSynonyms: () => (/* binding */ saveSynonyms),
/* harmony export */   search: () => (/* binding */ search),
/* harmony export */   searchDictionaryEntries: () => (/* binding */ searchDictionaryEntries),
/* harmony export */   searchForFacetValues: () => (/* binding */ searchForFacetValues),
/* harmony export */   searchRules: () => (/* binding */ searchRules),
/* harmony export */   searchSynonyms: () => (/* binding */ searchSynonyms),
/* harmony export */   searchUserIDs: () => (/* binding */ searchUserIDs),
/* harmony export */   setDictionarySettings: () => (/* binding */ setDictionarySettings),
/* harmony export */   setSettings: () => (/* binding */ setSettings),
/* harmony export */   updateApiKey: () => (/* binding */ updateApiKey),
/* harmony export */   waitAppTask: () => (/* binding */ waitAppTask),
/* harmony export */   waitTask: () => (/* binding */ waitTask)
/* harmony export */ });
/* harmony import */ var _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/client-common.esm.js");
/* harmony import */ var _algolia_transporter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @algolia/transporter */ "./node_modules/@algolia/transporter/dist/transporter.esm.js");
/* harmony import */ var _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @algolia/requester-common */ "./node_modules/@algolia/requester-common/dist/requester-common.esm.js");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ "crypto");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);





function createBrowsablePromise(options) {
    const browse = (data) => {
        return options.request(data).then(response => {
            /**
             * First we send to the developer the
             * batch retrieved from the API.
             */
            if (options.batch !== undefined) {
                options.batch(response.hits);
            }
            /**
             * Then, we ask to the browse concrete implementation
             * if we should stop browsing. As example, the `browseObjects`
             * method will stop if the cursor is not present on the response.
             */
            if (options.shouldStop(response)) {
                return undefined;
            }
            /**
             * Finally, if the response contains a cursor, we browse to the next
             * batch using that same cursor. Otherwise, we just use the traditional
             * browsing using the page element.
             */
            if (response.cursor) {
                return browse({
                    cursor: response.cursor,
                });
            }
            return browse({
                page: (data.page || 0) + 1,
            });
        });
    };
    return browse({});
}

const createSearchClient = options => {
    const appId = options.appId;
    const auth = (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createAuth)(options.authMode !== undefined ? options.authMode : _algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.AuthMode.WithinHeaders, appId, options.apiKey);
    const transporter = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createTransporter)({
        hosts: [
            { url: `${appId}-dsn.algolia.net`, accept: _algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.CallEnum.Read },
            { url: `${appId}.algolia.net`, accept: _algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.CallEnum.Write },
        ].concat((0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.shuffle)([
            { url: `${appId}-1.algolianet.com` },
            { url: `${appId}-2.algolianet.com` },
            { url: `${appId}-3.algolianet.com` },
        ])),
        ...options,
        headers: {
            ...auth.headers(),
            ...{ 'content-type': 'application/x-www-form-urlencoded' },
            ...options.headers,
        },
        queryParameters: {
            ...auth.queryParameters(),
            ...options.queryParameters,
        },
    });
    const base = {
        transporter,
        appId,
        addAlgoliaAgent(segment, version) {
            transporter.userAgent.add({ segment, version });
        },
        clearCache() {
            return Promise.all([
                transporter.requestsCache.clear(),
                transporter.responsesCache.clear(),
            ]).then(() => undefined);
        },
    };
    return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.addMethods)(base, options.methods);
};

function createMissingObjectIDError() {
    return {
        name: 'MissingObjectIDError',
        message: 'All objects must have an unique objectID ' +
            '(like a primary key) to be valid. ' +
            'Algolia is also able to generate objectIDs ' +
            "automatically but *it's not recommended*. " +
            "To do it, use the `{'autoGenerateObjectIDIfNotExist': true}` option.",
    };
}

function createObjectNotFoundError() {
    return {
        name: 'ObjectNotFoundError',
        message: 'Object not found.',
    };
}

function createValidUntilNotFoundError() {
    return {
        name: 'ValidUntilNotFoundError',
        message: 'ValidUntil not found in given secured api key.',
    };
}

const addApiKey = (base) => {
    return (acl, requestOptions) => {
        const { queryParameters, ...options } = requestOptions || {};
        const data = {
            acl,
            ...(queryParameters !== undefined ? { queryParameters } : {}),
        };
        const wait = (response, waitRequestOptions) => {
            return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createRetryablePromise)(retry => {
                return getApiKey(base)(response.key, waitRequestOptions).catch((apiError) => {
                    if (apiError.status !== 404) {
                        throw apiError;
                    }
                    return retry();
                });
            });
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/keys',
            data,
        }, options), wait);
    };
};

const assignUserID = (base) => {
    return (userID, clusterName, requestOptions) => {
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(requestOptions);
        // eslint-disable-next-line functional/immutable-data
        mappedRequestOptions.queryParameters['X-Algolia-User-ID'] = userID;
        return base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/clusters/mapping',
            data: { cluster: clusterName },
        }, mappedRequestOptions);
    };
};

const assignUserIDs = (base) => {
    return (userIDs, clusterName, requestOptions) => {
        return base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/clusters/mapping/batch',
            data: {
                users: userIDs,
                cluster: clusterName,
            },
        }, requestOptions);
    };
};

const clearDictionaryEntries = (base) => {
    return (dictionary, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('/1/dictionaries/%s/batch', dictionary),
            data: {
                clearExistingDictionaryEntries: true,
                requests: { action: 'addEntry', body: [] },
            },
        }, requestOptions), (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions));
    };
};

const copyIndex = (base) => {
    return (from, to, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return initIndex(base)(from, {
                methods: { waitTask },
            }).waitTask(response.taskID, waitRequestOptions);
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/operation', from),
            data: {
                operation: 'copy',
                destination: to,
            },
        }, requestOptions), wait);
    };
};

const copyRules = (base) => {
    return (from, to, requestOptions) => {
        return copyIndex(base)(from, to, {
            ...requestOptions,
            scope: [ScopeEnum.Rules],
        });
    };
};

const copySettings = (base) => {
    return (from, to, requestOptions) => {
        return copyIndex(base)(from, to, {
            ...requestOptions,
            scope: [ScopeEnum.Settings],
        });
    };
};

const copySynonyms = (base) => {
    return (from, to, requestOptions) => {
        return copyIndex(base)(from, to, {
            ...requestOptions,
            scope: [ScopeEnum.Synonyms],
        });
    };
};

const customRequest = (base) => {
    return (request, requestOptions) => {
        if (request.method === _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get) {
            return base.transporter.read(request, requestOptions);
        }
        return base.transporter.write(request, requestOptions);
    };
};

const deleteApiKey = (base) => {
    return (apiKey, requestOptions) => {
        const wait = (_, waitRequestOptions) => {
            return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createRetryablePromise)(retry => {
                return getApiKey(base)(apiKey, waitRequestOptions)
                    .then(retry)
                    .catch((apiError) => {
                    if (apiError.status !== 404) {
                        throw apiError;
                    }
                });
            });
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Delete,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/keys/%s', apiKey),
        }, requestOptions), wait);
    };
};

const deleteDictionaryEntries = (base) => {
    return (dictionary, objectIDs, requestOptions) => {
        const requests = objectIDs.map(objectID => ({
            action: 'deleteEntry',
            body: { objectID },
        }));
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('/1/dictionaries/%s/batch', dictionary),
            data: { clearExistingDictionaryEntries: false, requests },
        }, requestOptions), (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions));
    };
};

const generateSecuredApiKey = () => {
    return (parentApiKey, restrictions) => {
        const queryParameters = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.serializeQueryParameters)(restrictions);
        const securedKey = (0,crypto__WEBPACK_IMPORTED_MODULE_0__.createHmac)('sha256', parentApiKey)
            .update(queryParameters)
            .digest('hex');
        return Buffer.from(securedKey + queryParameters).toString('base64');
    };
};

const getApiKey = (base) => {
    return (apiKey, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/keys/%s', apiKey),
        }, requestOptions);
    };
};

const getAppTask = (base) => {
    return (taskID, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/task/%s', taskID.toString()),
        }, requestOptions);
    };
};

const getDictionarySettings = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '/1/dictionaries/*/settings',
        }, requestOptions);
    };
};

const getLogs = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '1/logs',
        }, requestOptions);
    };
};

const getSecuredApiKeyRemainingValidity = () => {
    return (securedApiKey) => {
        const decodedString = Buffer.from(securedApiKey, 'base64').toString('ascii');
        const regex = /validUntil=(\d+)/;
        const match = decodedString.match(regex);
        if (match === null) {
            throw createValidUntilNotFoundError();
        }
        return parseInt(match[1], 10) - Math.round(new Date().getTime() / 1000);
    };
};

const getTopUserIDs = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '1/clusters/mapping/top',
        }, requestOptions);
    };
};

const getUserID = (base) => {
    return (userID, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/clusters/mapping/%s', userID),
        }, requestOptions);
    };
};

const hasPendingMappings = (base) => {
    return (requestOptions) => {
        const { retrieveMappings, ...options } = requestOptions || {};
        if (retrieveMappings === true) {
            // eslint-disable-next-line functional/immutable-data
            options.getClusters = true;
        }
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '1/clusters/mapping/pending',
        }, options);
    };
};

const initIndex = (base) => {
    return (indexName, options = {}) => {
        const searchIndex = {
            transporter: base.transporter,
            appId: base.appId,
            indexName,
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.addMethods)(searchIndex, options.methods);
    };
};

const listApiKeys = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '1/keys',
        }, requestOptions);
    };
};

const listClusters = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '1/clusters',
        }, requestOptions);
    };
};

const listIndices = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '1/indexes',
        }, requestOptions);
    };
};

const listUserIDs = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: '1/clusters/mapping',
        }, requestOptions);
    };
};

const moveIndex = (base) => {
    return (from, to, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return initIndex(base)(from, {
                methods: { waitTask },
            }).waitTask(response.taskID, waitRequestOptions);
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/operation', from),
            data: {
                operation: 'move',
                destination: to,
            },
        }, requestOptions), wait);
    };
};

const multipleBatch = (base) => {
    return (requests, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return Promise.all(Object.keys(response.taskID).map(indexName => {
                return initIndex(base)(indexName, {
                    methods: { waitTask },
                }).waitTask(response.taskID[indexName], waitRequestOptions);
            }));
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/indexes/*/batch',
            data: {
                requests,
            },
        }, requestOptions), wait);
    };
};

const multipleGetObjects = (base) => {
    return (requests, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/indexes/*/objects',
            data: {
                requests,
            },
        }, requestOptions);
    };
};

const multipleQueries = (base) => {
    return (queries, requestOptions) => {
        const requests = queries.map(query => {
            return {
                ...query,
                params: (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.serializeQueryParameters)(query.params || {}),
            };
        });
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/indexes/*/queries',
            data: {
                requests,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const multipleSearchForFacetValues = (base) => {
    return (queries, requestOptions) => {
        return Promise.all(queries.map(query => {
            const { facetName, facetQuery, ...params } = query.params;
            return initIndex(base)(query.indexName, {
                methods: { searchForFacetValues },
            }).searchForFacetValues(facetName, facetQuery, {
                ...requestOptions,
                ...params,
            });
        }));
    };
};

const removeUserID = (base) => {
    return (userID, requestOptions) => {
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(requestOptions);
        // eslint-disable-next-line functional/immutable-data
        mappedRequestOptions.queryParameters['X-Algolia-User-ID'] = userID;
        return base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Delete,
            path: '1/clusters/mapping',
        }, mappedRequestOptions);
    };
};

const replaceDictionaryEntries = (base) => {
    return (dictionary, entries, requestOptions) => {
        const requests = entries.map(entry => ({
            action: 'addEntry',
            body: entry,
        }));
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('/1/dictionaries/%s/batch', dictionary),
            data: { clearExistingDictionaryEntries: true, requests },
        }, requestOptions), (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions));
    };
};

const restoreApiKey = (base) => {
    return (apiKey, requestOptions) => {
        const wait = (_, waitRequestOptions) => {
            return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createRetryablePromise)(retry => {
                return getApiKey(base)(apiKey, waitRequestOptions).catch((apiError) => {
                    if (apiError.status !== 404) {
                        throw apiError;
                    }
                    return retry();
                });
            });
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/keys/%s/restore', apiKey),
        }, requestOptions), wait);
    };
};

const saveDictionaryEntries = (base) => {
    return (dictionary, entries, requestOptions) => {
        const requests = entries.map(entry => ({
            action: 'addEntry',
            body: entry,
        }));
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('/1/dictionaries/%s/batch', dictionary),
            data: { clearExistingDictionaryEntries: false, requests },
        }, requestOptions), (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions));
    };
};

const searchDictionaryEntries = (base) => {
    return (dictionary, query, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('/1/dictionaries/%s/search', dictionary),
            data: {
                query,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const searchUserIDs = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/clusters/mapping/search',
            data: {
                query,
            },
        }, requestOptions);
    };
};

const setDictionarySettings = (base) => {
    return (settings, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Put,
            path: '/1/dictionaries/*/settings',
            data: settings,
        }, requestOptions), (response, waitRequestOptions) => waitAppTask(base)(response.taskID, waitRequestOptions));
    };
};

const updateApiKey = (base) => {
    return (apiKey, requestOptions) => {
        const updatedFields = Object.assign({}, requestOptions);
        const { queryParameters, ...options } = requestOptions || {};
        const data = queryParameters ? { queryParameters } : {};
        const apiKeyFields = [
            'acl',
            'indexes',
            'referers',
            'restrictSources',
            'queryParameters',
            'description',
            'maxQueriesPerIPPerHour',
            'maxHitsPerQuery',
        ];
        const hasChanged = (getApiKeyResponse) => {
            return Object.keys(updatedFields)
                .filter((updatedField) => apiKeyFields.indexOf(updatedField) !== -1)
                .every(updatedField => {
                return getApiKeyResponse[updatedField] === updatedFields[updatedField];
            });
        };
        const wait = (_, waitRequestOptions) => (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createRetryablePromise)(retry => {
            return getApiKey(base)(apiKey, waitRequestOptions).then(getApiKeyResponse => {
                return hasChanged(getApiKeyResponse) ? Promise.resolve() : retry();
            });
        });
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Put,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/keys/%s', apiKey),
            data,
        }, options), wait);
    };
};

const waitAppTask = (base) => {
    return (taskID, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createRetryablePromise)(retry => {
            return getAppTask(base)(taskID, requestOptions).then(response => {
                return response.status !== 'published' ? retry() : undefined;
            });
        });
    };
};

const batch = (base) => {
    return (requests, requestOptions) => {
        const wait = (response, waitRequestOptions) => {
            return waitTask(base)(response.taskID, waitRequestOptions);
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/batch', base.indexName),
            data: {
                requests,
            },
        }, requestOptions), wait);
    };
};

const browseObjects = (base) => {
    return (requestOptions) => {
        return createBrowsablePromise({
            shouldStop: response => response.cursor === undefined,
            ...requestOptions,
            request: (data) => base.transporter.read({
                method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
                path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/browse', base.indexName),
                data,
            }, requestOptions),
        });
    };
};

const browseRules = (base) => {
    return (requestOptions) => {
        const options = {
            hitsPerPage: 1000,
            ...requestOptions,
        };
        return createBrowsablePromise({
            shouldStop: response => response.hits.length < options.hitsPerPage,
            ...options,
            request(data) {
                return searchRules(base)('', { ...options, ...data }).then((response) => {
                    return {
                        ...response,
                        hits: response.hits.map(rule => {
                            // eslint-disable-next-line functional/immutable-data,no-param-reassign
                            delete rule._highlightResult;
                            return rule;
                        }),
                    };
                });
            },
        });
    };
};

const browseSynonyms = (base) => {
    return (requestOptions) => {
        const options = {
            hitsPerPage: 1000,
            ...requestOptions,
        };
        return createBrowsablePromise({
            shouldStop: response => response.hits.length < options.hitsPerPage,
            ...options,
            request(data) {
                return searchSynonyms(base)('', { ...options, ...data }).then((response) => {
                    return {
                        ...response,
                        hits: response.hits.map(synonym => {
                            // eslint-disable-next-line functional/immutable-data,no-param-reassign
                            delete synonym._highlightResult;
                            return synonym;
                        }),
                    };
                });
            },
        });
    };
};

const chunkedBatch = (base) => {
    return (bodies, action, requestOptions) => {
        const { batchSize, ...options } = requestOptions || {};
        const response = {
            taskIDs: [],
            objectIDs: [],
        };
        const forEachBatch = (lastIndex = 0) => {
            // eslint-disable-next-line functional/prefer-readonly-type
            const bodiesChunk = [];
            // eslint-disable-next-line functional/no-let
            let index;
            /* eslint-disable-next-line functional/no-loop-statement */
            for (index = lastIndex; index < bodies.length; index++) {
                // eslint-disable-next-line functional/immutable-data
                bodiesChunk.push(bodies[index]);
                if (bodiesChunk.length === (batchSize || 1000)) {
                    break;
                }
            }
            if (bodiesChunk.length === 0) {
                return Promise.resolve(response);
            }
            return batch(base)(bodiesChunk.map(body => {
                return {
                    action,
                    body,
                };
            }), options).then(res => {
                response.objectIDs = response.objectIDs.concat(res.objectIDs); // eslint-disable-line functional/immutable-data
                response.taskIDs.push(res.taskID); // eslint-disable-line functional/immutable-data
                index++;
                return forEachBatch(index);
            });
        };
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(forEachBatch(), (chunkedBatchResponse, waitRequestOptions) => {
            return Promise.all(chunkedBatchResponse.taskIDs.map(taskID => {
                return waitTask(base)(taskID, waitRequestOptions);
            }));
        });
    };
};

const clearObjects = (base) => {
    return (requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/clear', base.indexName),
        }, requestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const clearRules = (base) => {
    return (requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/rules/clear', base.indexName),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const clearSynonyms = (base) => {
    return (requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/synonyms/clear', base.indexName),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteBy = (base) => {
    return (filters, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/deleteByQuery', base.indexName),
            data: filters,
        }, requestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteIndex = (base) => {
    return (requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Delete,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s', base.indexName),
        }, requestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteObject = (base) => {
    return (objectID, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(deleteObjects(base)([objectID], requestOptions).then(response => {
            return { taskID: response.taskIDs[0] };
        }), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteObjects = (base) => {
    return (objectIDs, requestOptions) => {
        const objects = objectIDs.map(objectID => {
            return { objectID };
        });
        return chunkedBatch(base)(objects, BatchActionEnum.DeleteObject, requestOptions);
    };
};

const deleteRule = (base) => {
    return (objectID, requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Delete,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/rules/%s', base.indexName, objectID),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const deleteSynonym = (base) => {
    return (objectID, requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Delete,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/synonyms/%s', base.indexName, objectID),
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const exists = (base) => {
    return (requestOptions) => {
        return getSettings(base)(requestOptions)
            .then(() => true)
            .catch(error => {
            if (error.status !== 404) {
                throw error;
            }
            return false;
        });
    };
};

const findAnswers = (base) => {
    return (query, queryLanguages, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/answers/%s/prediction', base.indexName),
            data: {
                query,
                queryLanguages,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const findObject = (base) => {
    return (callback, requestOptions) => {
        const { query, paginate, ...options } = requestOptions || {};
        // eslint-disable-next-line functional/no-let
        let page = 0;
        const forEachPage = () => {
            return search(base)(query || '', { ...options, page }).then(result => {
                // eslint-disable-next-line functional/no-loop-statement
                for (const [position, hit] of Object.entries(result.hits)) {
                    // eslint-disable-next-line promise/no-callback-in-promise
                    if (callback(hit)) {
                        return {
                            object: hit,
                            position: parseInt(position, 10),
                            page,
                        };
                    }
                }
                page++;
                // paginate if option was set and has next page
                if (paginate === false || page >= result.nbPages) {
                    throw createObjectNotFoundError();
                }
                return forEachPage();
            });
        };
        return forEachPage();
    };
};

const getObject = (base) => {
    return (objectID, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/%s', base.indexName, objectID),
        }, requestOptions);
    };
};

const getObjectPosition = () => {
    return (searchResponse, objectID) => {
        // eslint-disable-next-line functional/no-loop-statement
        for (const [position, hit] of Object.entries(searchResponse.hits)) {
            if (hit.objectID === objectID) {
                return parseInt(position, 10);
            }
        }
        return -1;
    };
};

const getObjects = (base) => {
    return (objectIDs, requestOptions) => {
        const { attributesToRetrieve, ...options } = requestOptions || {};
        const requests = objectIDs.map(objectID => {
            return {
                indexName: base.indexName,
                objectID,
                ...(attributesToRetrieve ? { attributesToRetrieve } : {}),
            };
        });
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: '1/indexes/*/objects',
            data: {
                requests,
            },
        }, options);
    };
};

const getRule = (base) => {
    return (objectID, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/rules/%s', base.indexName, objectID),
        }, requestOptions);
    };
};

const getSettings = (base) => {
    return (requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/settings', base.indexName),
            data: {
                getVersion: 2,
            },
        }, requestOptions);
    };
};

const getSynonym = (base) => {
    return (objectID, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)(`1/indexes/%s/synonyms/%s`, base.indexName, objectID),
        }, requestOptions);
    };
};

const getTask = (base) => {
    return (taskID, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Get,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/task/%s', base.indexName, taskID.toString()),
        }, requestOptions);
    };
};

const partialUpdateObject = (base) => {
    return (object, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(partialUpdateObjects(base)([object], requestOptions).then(response => {
            return {
                objectID: response.objectIDs[0],
                taskID: response.taskIDs[0],
            };
        }), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const partialUpdateObjects = (base) => {
    return (objects, requestOptions) => {
        const { createIfNotExists, ...options } = requestOptions || {};
        const action = createIfNotExists
            ? BatchActionEnum.PartialUpdateObject
            : BatchActionEnum.PartialUpdateObjectNoCreate;
        return chunkedBatch(base)(objects, action, options);
    };
};

const replaceAllObjects = (base) => {
    return (objects, requestOptions) => {
        const { safe, autoGenerateObjectIDIfNotExist, batchSize, ...options } = requestOptions || {};
        const operation = (from, to, type, operationRequestOptions) => {
            return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
                method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
                path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/operation', from),
                data: {
                    operation: type,
                    destination: to,
                },
            }, operationRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
        };
        const randomSuffix = Math.random()
            .toString(36)
            .substring(7);
        const temporaryIndexName = `${base.indexName}_tmp_${randomSuffix}`;
        const saveObjectsInTemporary = saveObjects({
            appId: base.appId,
            transporter: base.transporter,
            indexName: temporaryIndexName,
        });
        // @ts-ignore
        // eslint-disable-next-line prefer-const, functional/no-let, functional/prefer-readonly-type
        let responses = [];
        const copyWaitablePromise = operation(base.indexName, temporaryIndexName, 'copy', {
            ...options,
            scope: ['settings', 'synonyms', 'rules'],
        });
        // eslint-disable-next-line functional/immutable-data
        responses.push(copyWaitablePromise);
        const result = (safe
            ? copyWaitablePromise.wait(options)
            : copyWaitablePromise)
            .then(() => {
            const saveObjectsWaitablePromise = saveObjectsInTemporary(objects, {
                ...options,
                autoGenerateObjectIDIfNotExist,
                batchSize,
            });
            // eslint-disable-next-line functional/immutable-data
            responses.push(saveObjectsWaitablePromise);
            return safe ? saveObjectsWaitablePromise.wait(options) : saveObjectsWaitablePromise;
        })
            .then(() => {
            const moveWaitablePromise = operation(temporaryIndexName, base.indexName, 'move', options);
            // eslint-disable-next-line functional/immutable-data
            responses.push(moveWaitablePromise);
            return safe ? moveWaitablePromise.wait(options) : moveWaitablePromise;
        })
            .then(() => Promise.all(responses))
            .then(([copyResponse, saveObjectsResponse, moveResponse]) => {
            return {
                objectIDs: saveObjectsResponse.objectIDs,
                taskIDs: [copyResponse.taskID, ...saveObjectsResponse.taskIDs, moveResponse.taskID],
            };
        });
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(result, (_, waitRequestOptions) => {
            return Promise.all(responses.map(response => response.wait(waitRequestOptions)));
        });
    };
};

const replaceAllRules = (base) => {
    return (rules, requestOptions) => {
        return saveRules(base)(rules, {
            ...requestOptions,
            clearExistingRules: true,
        });
    };
};

const replaceAllSynonyms = (base) => {
    return (synonyms, requestOptions) => {
        return saveSynonyms(base)(synonyms, {
            ...requestOptions,
            clearExistingSynonyms: true,
        });
    };
};

const saveObject = (base) => {
    return (object, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(saveObjects(base)([object], requestOptions).then(response => {
            return {
                objectID: response.objectIDs[0],
                taskID: response.taskIDs[0],
            };
        }), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const saveObjects = (base) => {
    return (objects, requestOptions) => {
        const { autoGenerateObjectIDIfNotExist, ...options } = requestOptions || {};
        const action = autoGenerateObjectIDIfNotExist
            ? BatchActionEnum.AddObject
            : BatchActionEnum.UpdateObject;
        if (action === BatchActionEnum.UpdateObject) {
            // eslint-disable-next-line functional/no-loop-statement
            for (const object of objects) {
                if (object.objectID === undefined) {
                    return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(Promise.reject(createMissingObjectIDError()));
                }
            }
        }
        return chunkedBatch(base)(objects, action, options);
    };
};

const saveRule = (base) => {
    return (rule, requestOptions) => {
        return saveRules(base)([rule], requestOptions);
    };
};

const saveRules = (base) => {
    return (rules, requestOptions) => {
        const { forwardToReplicas, clearExistingRules, ...options } = requestOptions || {};
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        if (clearExistingRules) {
            mappedRequestOptions.queryParameters.clearExistingRules = 1; // eslint-disable-line functional/immutable-data
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/rules/batch', base.indexName),
            data: rules,
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const saveSynonym = (base) => {
    return (synonym, requestOptions) => {
        return saveSynonyms(base)([synonym], requestOptions);
    };
};

const saveSynonyms = (base) => {
    return (synonyms, requestOptions) => {
        const { forwardToReplicas, clearExistingSynonyms, replaceExistingSynonyms, ...options } = requestOptions || {};
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        if (replaceExistingSynonyms || clearExistingSynonyms) {
            mappedRequestOptions.queryParameters.replaceExistingSynonyms = 1; // eslint-disable-line functional/immutable-data
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/synonyms/batch', base.indexName),
            data: synonyms,
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const search = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/query', base.indexName),
            data: {
                query,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const searchForFacetValues = (base) => {
    return (facetName, facetQuery, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/facets/%s/query', base.indexName, facetName),
            data: {
                facetQuery,
            },
            cacheable: true,
        }, requestOptions);
    };
};

const searchRules = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/rules/search', base.indexName),
            data: {
                query,
            },
        }, requestOptions);
    };
};

const searchSynonyms = (base) => {
    return (query, requestOptions) => {
        return base.transporter.read({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Post,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/synonyms/search', base.indexName),
            data: {
                query,
            },
        }, requestOptions);
    };
};

const setSettings = (base) => {
    return (settings, requestOptions) => {
        const { forwardToReplicas, ...options } = requestOptions || {};
        const mappedRequestOptions = (0,_algolia_transporter__WEBPACK_IMPORTED_MODULE_2__.createMappedRequestOptions)(options);
        if (forwardToReplicas) {
            mappedRequestOptions.queryParameters.forwardToReplicas = 1; // eslint-disable-line functional/immutable-data
        }
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createWaitablePromise)(base.transporter.write({
            method: _algolia_requester_common__WEBPACK_IMPORTED_MODULE_3__.MethodEnum.Put,
            path: (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.encode)('1/indexes/%s/settings', base.indexName),
            data: settings,
        }, mappedRequestOptions), (response, waitRequestOptions) => waitTask(base)(response.taskID, waitRequestOptions));
    };
};

const waitTask = (base) => {
    return (taskID, requestOptions) => {
        return (0,_algolia_client_common__WEBPACK_IMPORTED_MODULE_1__.createRetryablePromise)(retry => {
            return getTask(base)(taskID, requestOptions).then(response => {
                return response.status !== 'published' ? retry() : undefined;
            });
        });
    };
};

const ApiKeyACLEnum = {
    AddObject: 'addObject',
    Analytics: 'analytics',
    Browser: 'browse',
    DeleteIndex: 'deleteIndex',
    DeleteObject: 'deleteObject',
    EditSettings: 'editSettings',
    ListIndexes: 'listIndexes',
    Logs: 'logs',
    Personalization: 'personalization',
    Recommendation: 'recommendation',
    Search: 'search',
    SeeUnretrievableAttributes: 'seeUnretrievableAttributes',
    Settings: 'settings',
    Usage: 'usage',
};

const BatchActionEnum = {
    AddObject: 'addObject',
    UpdateObject: 'updateObject',
    PartialUpdateObject: 'partialUpdateObject',
    PartialUpdateObjectNoCreate: 'partialUpdateObjectNoCreate',
    DeleteObject: 'deleteObject',
    DeleteIndex: 'delete',
    ClearIndex: 'clear',
};

const ScopeEnum = {
    Settings: 'settings',
    Synonyms: 'synonyms',
    Rules: 'rules',
};

const StrategyEnum = {
    None: 'none',
    StopIfEnoughMatches: 'stopIfEnoughMatches',
};

const SynonymEnum = {
    Synonym: 'synonym',
    OneWaySynonym: 'oneWaySynonym',
    AltCorrection1: 'altCorrection1',
    AltCorrection2: 'altCorrection2',
    Placeholder: 'placeholder',
};




/***/ }),

/***/ "./node_modules/@algolia/events/events.js":
/*!************************************************!*\
  !*** ./node_modules/@algolia/events/events.js ***!
  \************************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
// EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "./node_modules/@algolia/logger-common/dist/logger-common.esm.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@algolia/logger-common/dist/logger-common.esm.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LogLevelEnum: () => (/* binding */ LogLevelEnum),
/* harmony export */   createNullLogger: () => (/* binding */ createNullLogger)
/* harmony export */ });
function createNullLogger() {
    return {
        debug(_message, _args) {
            return Promise.resolve();
        },
        info(_message, _args) {
            return Promise.resolve();
        },
        error(_message, _args) {
            return Promise.resolve();
        },
    };
}

const LogLevelEnum = {
    Debug: 1,
    Info: 2,
    Error: 3,
};




/***/ }),

/***/ "./node_modules/@algolia/requester-common/dist/requester-common.esm.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@algolia/requester-common/dist/requester-common.esm.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MethodEnum: () => (/* binding */ MethodEnum)
/* harmony export */ });
const MethodEnum = {
    Delete: 'DELETE',
    Get: 'GET',
    Post: 'POST',
    Put: 'PUT',
};




/***/ }),

/***/ "./node_modules/@algolia/requester-node-http/dist/requester-node-http.esm.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@algolia/requester-node-http/dist/requester-node-http.esm.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNodeHttpRequester: () => (/* binding */ createNodeHttpRequester)
/* harmony export */ });
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! https */ "https");
/* harmony import */ var https__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(https__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "url");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(url__WEBPACK_IMPORTED_MODULE_2__);






/* eslint functional/prefer-readonly-type: 0 */
const agentOptions = { keepAlive: true };
const defaultHttpAgent = new http__WEBPACK_IMPORTED_MODULE_0__.Agent(agentOptions);
const defaultHttpsAgent = new https__WEBPACK_IMPORTED_MODULE_1__.Agent(agentOptions);
function createNodeHttpRequester({ agent: userGlobalAgent, httpAgent: userHttpAgent, httpsAgent: userHttpsAgent, requesterOptions = {}, } = {}) {
    const httpAgent = userHttpAgent || userGlobalAgent || defaultHttpAgent;
    const httpsAgent = userHttpsAgent || userGlobalAgent || defaultHttpsAgent;
    return {
        send(request) {
            return new Promise(resolve => {
                const url = (0,url__WEBPACK_IMPORTED_MODULE_2__.parse)(request.url);
                const path = url.query === null ? url.pathname : `${url.pathname}?${url.query}`;
                const options = {
                    ...requesterOptions,
                    agent: url.protocol === 'https:' ? httpsAgent : httpAgent,
                    hostname: url.hostname,
                    path,
                    method: request.method,
                    headers: {
                        ...(requesterOptions && requesterOptions.headers ? requesterOptions.headers : {}),
                        ...request.headers,
                    },
                    ...(url.port !== undefined ? { port: url.port || '' } : {}),
                };
                const req = (url.protocol === 'https:' ? https__WEBPACK_IMPORTED_MODULE_1__ : http__WEBPACK_IMPORTED_MODULE_0__).request(options, response => {
                    // eslint-disable-next-line functional/no-let
                    let contentBuffers = [];
                    response.on('data', chunk => {
                        contentBuffers = contentBuffers.concat(chunk);
                    });
                    response.on('end', () => {
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        clearTimeout(connectTimeout);
                        // eslint-disable-next-line @typescript-eslint/no-use-before-define
                        clearTimeout(responseTimeout);
                        resolve({
                            status: response.statusCode || 0,
                            content: Buffer.concat(contentBuffers).toString(),
                            isTimedOut: false,
                        });
                    });
                });
                const createTimeout = (timeout, content) => {
                    return setTimeout(() => {
                        req.abort();
                        resolve({
                            status: 0,
                            content,
                            isTimedOut: true,
                        });
                    }, timeout * 1000);
                };
                const connectTimeout = createTimeout(request.connectTimeout, 'Connection timeout');
                // eslint-disable-next-line functional/no-let
                let responseTimeout;
                req.on('error', error => {
                    clearTimeout(connectTimeout);
                    clearTimeout(responseTimeout);
                    resolve({ status: 0, content: error.message, isTimedOut: false });
                });
                req.once('response', () => {
                    clearTimeout(connectTimeout);
                    responseTimeout = createTimeout(request.responseTimeout, 'Socket timeout');
                });
                if (request.data !== undefined) {
                    req.write(request.data);
                }
                req.end();
            });
        },
        destroy() {
            httpAgent.destroy();
            httpsAgent.destroy();
            return Promise.resolve();
        },
    };
}




/***/ }),

/***/ "./node_modules/@algolia/transporter/dist/transporter.esm.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@algolia/transporter/dist/transporter.esm.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CallEnum: () => (/* binding */ CallEnum),
/* harmony export */   HostStatusEnum: () => (/* binding */ HostStatusEnum),
/* harmony export */   createApiError: () => (/* binding */ createApiError),
/* harmony export */   createDeserializationError: () => (/* binding */ createDeserializationError),
/* harmony export */   createMappedRequestOptions: () => (/* binding */ createMappedRequestOptions),
/* harmony export */   createRetryError: () => (/* binding */ createRetryError),
/* harmony export */   createStatefulHost: () => (/* binding */ createStatefulHost),
/* harmony export */   createStatelessHost: () => (/* binding */ createStatelessHost),
/* harmony export */   createTransporter: () => (/* binding */ createTransporter),
/* harmony export */   createUserAgent: () => (/* binding */ createUserAgent),
/* harmony export */   deserializeFailure: () => (/* binding */ deserializeFailure),
/* harmony export */   deserializeSuccess: () => (/* binding */ deserializeSuccess),
/* harmony export */   isStatefulHostTimeouted: () => (/* binding */ isStatefulHostTimeouted),
/* harmony export */   isStatefulHostUp: () => (/* binding */ isStatefulHostUp),
/* harmony export */   serializeData: () => (/* binding */ serializeData),
/* harmony export */   serializeHeaders: () => (/* binding */ serializeHeaders),
/* harmony export */   serializeQueryParameters: () => (/* binding */ serializeQueryParameters),
/* harmony export */   serializeUrl: () => (/* binding */ serializeUrl),
/* harmony export */   stackFrameWithoutCredentials: () => (/* binding */ stackFrameWithoutCredentials),
/* harmony export */   stackTraceWithoutCredentials: () => (/* binding */ stackTraceWithoutCredentials)
/* harmony export */ });
/* harmony import */ var _algolia_requester_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @algolia/requester-common */ "./node_modules/@algolia/requester-common/dist/requester-common.esm.js");


function createMappedRequestOptions(requestOptions, timeout) {
    const options = requestOptions || {};
    const data = options.data || {};
    Object.keys(options).forEach(key => {
        if (['timeout', 'headers', 'queryParameters', 'data', 'cacheable'].indexOf(key) === -1) {
            data[key] = options[key]; // eslint-disable-line functional/immutable-data
        }
    });
    return {
        data: Object.entries(data).length > 0 ? data : undefined,
        timeout: options.timeout || timeout,
        headers: options.headers || {},
        queryParameters: options.queryParameters || {},
        cacheable: options.cacheable,
    };
}

const CallEnum = {
    /**
     * If the host is read only.
     */
    Read: 1,
    /**
     * If the host is write only.
     */
    Write: 2,
    /**
     * If the host is both read and write.
     */
    Any: 3,
};

const HostStatusEnum = {
    Up: 1,
    Down: 2,
    Timeouted: 3,
};

// By default, API Clients at Algolia have expiration delay
// of 5 mins. In the JavaScript client, we have 2 mins.
const EXPIRATION_DELAY = 2 * 60 * 1000;
function createStatefulHost(host, status = HostStatusEnum.Up) {
    return {
        ...host,
        status,
        lastUpdate: Date.now(),
    };
}
function isStatefulHostUp(host) {
    return host.status === HostStatusEnum.Up || Date.now() - host.lastUpdate > EXPIRATION_DELAY;
}
function isStatefulHostTimeouted(host) {
    return (host.status === HostStatusEnum.Timeouted && Date.now() - host.lastUpdate <= EXPIRATION_DELAY);
}

function createStatelessHost(options) {
    if (typeof options === 'string') {
        return {
            protocol: 'https',
            url: options,
            accept: CallEnum.Any,
        };
    }
    return {
        protocol: options.protocol || 'https',
        url: options.url,
        accept: options.accept || CallEnum.Any,
    };
}

function createRetryableOptions(hostsCache, statelessHosts) {
    return Promise.all(statelessHosts.map(statelessHost => {
        return hostsCache.get(statelessHost, () => {
            return Promise.resolve(createStatefulHost(statelessHost));
        });
    })).then(statefulHosts => {
        const hostsUp = statefulHosts.filter(host => isStatefulHostUp(host));
        const hostsTimeouted = statefulHosts.filter(host => isStatefulHostTimeouted(host));
        /**
         * Note, we put the hosts that previously timeouted on the end of the list.
         */
        const hostsAvailable = [...hostsUp, ...hostsTimeouted];
        const statelessHostsAvailable = hostsAvailable.length > 0
            ? hostsAvailable.map(host => createStatelessHost(host))
            : statelessHosts;
        return {
            getTimeout(timeoutsCount, baseTimeout) {
                /**
                 * Imagine that you have 4 hosts, if timeouts will increase
                 * on the following way: 1 (timeouted) > 4 (timeouted) > 5 (200)
                 *
                 * Note that, the very next request, we start from the previous timeout
                 *
                 *  5 (timeouted) > 6 (timeouted) > 7 ...
                 *
                 * This strategy may need to be reviewed, but is the strategy on the our
                 * current v3 version.
                 */
                const timeoutMultiplier = hostsTimeouted.length === 0 && timeoutsCount === 0
                    ? 1
                    : hostsTimeouted.length + 3 + timeoutsCount;
                return timeoutMultiplier * baseTimeout;
            },
            statelessHosts: statelessHostsAvailable,
        };
    });
}

const isNetworkError = ({ isTimedOut, status }) => {
    return !isTimedOut && ~~status === 0;
};
const isRetryable = (response) => {
    const status = response.status;
    const isTimedOut = response.isTimedOut;
    return (isTimedOut || isNetworkError(response) || (~~(status / 100) !== 2 && ~~(status / 100) !== 4));
};
const isSuccess = ({ status }) => {
    return ~~(status / 100) === 2;
};
const retryDecision = (response, outcomes) => {
    if (isRetryable(response)) {
        return outcomes.onRetry(response);
    }
    if (isSuccess(response)) {
        return outcomes.onSuccess(response);
    }
    return outcomes.onFail(response);
};

function retryableRequest(transporter, statelessHosts, request, requestOptions) {
    const stackTrace = []; // eslint-disable-line functional/prefer-readonly-type
    /**
     * First we prepare the payload that do not depend from hosts.
     */
    const data = serializeData(request, requestOptions);
    const headers = serializeHeaders(transporter, requestOptions);
    const method = request.method;
    // On `GET`, the data is proxied to query parameters.
    const dataQueryParameters = request.method !== _algolia_requester_common__WEBPACK_IMPORTED_MODULE_0__.MethodEnum.Get
        ? {}
        : {
            ...request.data,
            ...requestOptions.data,
        };
    const queryParameters = {
        'x-algolia-agent': transporter.userAgent.value,
        ...transporter.queryParameters,
        ...dataQueryParameters,
        ...requestOptions.queryParameters,
    };
    let timeoutsCount = 0; // eslint-disable-line functional/no-let
    const retry = (hosts, // eslint-disable-line functional/prefer-readonly-type
    getTimeout) => {
        /**
         * We iterate on each host, until there is no host left.
         */
        const host = hosts.pop(); // eslint-disable-line functional/immutable-data
        if (host === undefined) {
            throw createRetryError(stackTraceWithoutCredentials(stackTrace));
        }
        const payload = {
            data,
            headers,
            method,
            url: serializeUrl(host, request.path, queryParameters),
            connectTimeout: getTimeout(timeoutsCount, transporter.timeouts.connect),
            responseTimeout: getTimeout(timeoutsCount, requestOptions.timeout),
        };
        /**
         * The stackFrame is pushed to the stackTrace so we
         * can have information about onRetry and onFailure
         * decisions.
         */
        const pushToStackTrace = (response) => {
            const stackFrame = {
                request: payload,
                response,
                host,
                triesLeft: hosts.length,
            };
            // eslint-disable-next-line functional/immutable-data
            stackTrace.push(stackFrame);
            return stackFrame;
        };
        const decisions = {
            onSuccess: response => deserializeSuccess(response),
            onRetry(response) {
                const stackFrame = pushToStackTrace(response);
                /**
                 * If response is a timeout, we increaset the number of
                 * timeouts so we can increase the timeout later.
                 */
                if (response.isTimedOut) {
                    timeoutsCount++;
                }
                return Promise.all([
                    /**
                     * Failures are individually send the logger, allowing
                     * the end user to debug / store stack frames even
                     * when a retry error does not happen.
                     */
                    transporter.logger.info('Retryable failure', stackFrameWithoutCredentials(stackFrame)),
                    /**
                     * We also store the state of the host in failure cases. If the host, is
                     * down it will remain down for the next 2 minutes. In a timeout situation,
                     * this host will be added end of the list of hosts on the next request.
                     */
                    transporter.hostsCache.set(host, createStatefulHost(host, response.isTimedOut ? HostStatusEnum.Timeouted : HostStatusEnum.Down)),
                ]).then(() => retry(hosts, getTimeout));
            },
            onFail(response) {
                pushToStackTrace(response);
                throw deserializeFailure(response, stackTraceWithoutCredentials(stackTrace));
            },
        };
        return transporter.requester.send(payload).then(response => {
            return retryDecision(response, decisions);
        });
    };
    /**
     * Finally, for each retryable host perform request until we got a non
     * retryable response. Some notes here:
     *
     * 1. The reverse here is applied so we can apply a `pop` later on => more performant.
     * 2. We also get from the retryable options a timeout multiplier that is tailored
     * for the current context.
     */
    return createRetryableOptions(transporter.hostsCache, statelessHosts).then(options => {
        return retry([...options.statelessHosts].reverse(), options.getTimeout);
    });
}

function createTransporter(options) {
    const { hostsCache, logger, requester, requestsCache, responsesCache, timeouts, userAgent, hosts, queryParameters, headers, } = options;
    const transporter = {
        hostsCache,
        logger,
        requester,
        requestsCache,
        responsesCache,
        timeouts,
        userAgent,
        headers,
        queryParameters,
        hosts: hosts.map(host => createStatelessHost(host)),
        read(request, requestOptions) {
            /**
             * First, we compute the user request options. Now, keep in mind,
             * that using request options the user is able to modified the intire
             * payload of the request. Such as headers, query parameters, and others.
             */
            const mappedRequestOptions = createMappedRequestOptions(requestOptions, transporter.timeouts.read);
            const createRetryableRequest = () => {
                /**
                 * Then, we prepare a function factory that contains the construction of
                 * the retryable request. At this point, we may *not* perform the actual
                 * request. But we want to have the function factory ready.
                 */
                return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Read) !== 0), request, mappedRequestOptions);
            };
            /**
             * Once we have the function factory ready, we need to determine of the
             * request is "cacheable" - should be cached. Note that, once again,
             * the user can force this option.
             */
            const cacheable = mappedRequestOptions.cacheable !== undefined
                ? mappedRequestOptions.cacheable
                : request.cacheable;
            /**
             * If is not "cacheable", we immediatly trigger the retryable request, no
             * need to check cache implementations.
             */
            if (cacheable !== true) {
                return createRetryableRequest();
            }
            /**
             * If the request is "cacheable", we need to first compute the key to ask
             * the cache implementations if this request is on progress or if the
             * response already exists on the cache.
             */
            const key = {
                request,
                mappedRequestOptions,
                transporter: {
                    queryParameters: transporter.queryParameters,
                    headers: transporter.headers,
                },
            };
            /**
             * With the computed key, we first ask the responses cache
             * implemention if this request was been resolved before.
             */
            return transporter.responsesCache.get(key, () => {
                /**
                 * If the request has never resolved before, we actually ask if there
                 * is a current request with the same key on progress.
                 */
                return transporter.requestsCache.get(key, () => {
                    return (transporter.requestsCache
                        /**
                         * Finally, if there is no request in progress with the same key,
                         * this `createRetryableRequest()` will actually trigger the
                         * retryable request.
                         */
                        .set(key, createRetryableRequest())
                        .then(response => Promise.all([transporter.requestsCache.delete(key), response]), err => Promise.all([transporter.requestsCache.delete(key), Promise.reject(err)]))
                        .then(([_, response]) => response));
                });
            }, {
                /**
                 * Of course, once we get this response back from the server, we
                 * tell response cache to actually store the received response
                 * to be used later.
                 */
                miss: response => transporter.responsesCache.set(key, response),
            });
        },
        write(request, requestOptions) {
            /**
             * On write requests, no cache mechanisms are applied, and we
             * proxy the request immediately to the requester.
             */
            return retryableRequest(transporter, transporter.hosts.filter(host => (host.accept & CallEnum.Write) !== 0), request, createMappedRequestOptions(requestOptions, transporter.timeouts.write));
        },
    };
    return transporter;
}

function createUserAgent(version) {
    const userAgent = {
        value: `Algolia for JavaScript (${version})`,
        add(options) {
            const addedUserAgent = `; ${options.segment}${options.version !== undefined ? ` (${options.version})` : ''}`;
            if (userAgent.value.indexOf(addedUserAgent) === -1) {
                // eslint-disable-next-line functional/immutable-data
                userAgent.value = `${userAgent.value}${addedUserAgent}`;
            }
            return userAgent;
        },
    };
    return userAgent;
}

function deserializeSuccess(response) {
    // eslint-disable-next-line functional/no-try-statement
    try {
        return JSON.parse(response.content);
    }
    catch (e) {
        throw createDeserializationError(e.message, response);
    }
}
function deserializeFailure({ content, status }, stackFrame) {
    // eslint-disable-next-line functional/no-let
    let message = content;
    // eslint-disable-next-line functional/no-try-statement
    try {
        message = JSON.parse(content).message;
    }
    catch (e) {
        // ..
    }
    return createApiError(message, status, stackFrame);
}

// eslint-disable-next-line functional/prefer-readonly-type
function encode(format, ...args) {
    // eslint-disable-next-line functional/no-let
    let i = 0;
    return format.replace(/%s/g, () => encodeURIComponent(args[i++]));
}

function serializeUrl(host, path, queryParameters) {
    const queryParametersAsString = serializeQueryParameters(queryParameters);
    // eslint-disable-next-line functional/no-let
    let url = `${host.protocol}://${host.url}/${path.charAt(0) === '/' ? path.substr(1) : path}`;
    if (queryParametersAsString.length) {
        url += `?${queryParametersAsString}`;
    }
    return url;
}
function serializeQueryParameters(parameters) {
    const isObjectOrArray = (value) => Object.prototype.toString.call(value) === '[object Object]' ||
        Object.prototype.toString.call(value) === '[object Array]';
    return Object.keys(parameters)
        .map(key => encode('%s=%s', key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]))
        .join('&');
}
function serializeData(request, requestOptions) {
    if (request.method === _algolia_requester_common__WEBPACK_IMPORTED_MODULE_0__.MethodEnum.Get ||
        (request.data === undefined && requestOptions.data === undefined)) {
        return undefined;
    }
    const data = Array.isArray(request.data)
        ? request.data
        : { ...request.data, ...requestOptions.data };
    return JSON.stringify(data);
}
function serializeHeaders(transporter, requestOptions) {
    const headers = {
        ...transporter.headers,
        ...requestOptions.headers,
    };
    const serializedHeaders = {};
    Object.keys(headers).forEach(header => {
        const value = headers[header];
        // @ts-ignore
        // eslint-disable-next-line functional/immutable-data
        serializedHeaders[header.toLowerCase()] = value;
    });
    return serializedHeaders;
}

function stackTraceWithoutCredentials(stackTrace) {
    return stackTrace.map(stackFrame => stackFrameWithoutCredentials(stackFrame));
}
function stackFrameWithoutCredentials(stackFrame) {
    const modifiedHeaders = stackFrame.request.headers['x-algolia-api-key']
        ? { 'x-algolia-api-key': '*****' }
        : {};
    return {
        ...stackFrame,
        request: {
            ...stackFrame.request,
            headers: {
                ...stackFrame.request.headers,
                ...modifiedHeaders,
            },
        },
    };
}

function createApiError(message, status, transporterStackTrace) {
    return {
        name: 'ApiError',
        message,
        status,
        transporterStackTrace,
    };
}

function createDeserializationError(message, response) {
    return {
        name: 'DeserializationError',
        message,
        response,
    };
}

function createRetryError(transporterStackTrace) {
    return {
        name: 'RetryError',
        message: 'Unreachable hosts - your application id may be incorrect. If the error persists, contact support@algolia.com.',
        transporterStackTrace,
    };
}




/***/ }),

/***/ "./node_modules/algoliasearch-helper/index.js":
/*!****************************************************!*\
  !*** ./node_modules/algoliasearch-helper/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var AlgoliaSearchHelper = __webpack_require__(/*! ./src/algoliasearch.helper */ "./node_modules/algoliasearch-helper/src/algoliasearch.helper.js");
var SearchParameters = __webpack_require__(/*! ./src/SearchParameters */ "./node_modules/algoliasearch-helper/src/SearchParameters/index.js");
var SearchResults = __webpack_require__(/*! ./src/SearchResults */ "./node_modules/algoliasearch-helper/src/SearchResults/index.js");

/**
 * The algoliasearchHelper module is the function that will let its
 * contains everything needed to use the Algoliasearch
 * Helper. It is a also a function that instanciate the helper.
 * To use the helper, you also need the Algolia JS client v3.
 * @example
 * //using the UMD build
 * var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
 * var helper = algoliasearchHelper(client, 'bestbuy', {
 *   facets: ['shipping'],
 *   disjunctiveFacets: ['category']
 * });
 * helper.on('result', function(event) {
 *   console.log(event.results);
 * });
 * helper
 *   .toggleFacetRefinement('category', 'Movies & TV Shows')
 *   .toggleFacetRefinement('shipping', 'Free shipping')
 *   .search();
 * @example
 * // The helper is an event emitter using the node API
 * helper.on('result', updateTheResults);
 * helper.once('result', updateTheResults);
 * helper.removeListener('result', updateTheResults);
 * helper.removeAllListeners('result');
 * @module algoliasearchHelper
 * @param  {AlgoliaSearch} client an AlgoliaSearch client
 * @param  {string} index the name of the index to query
 * @param  {SearchParameters|object} opts an object defining the initial config of the search. It doesn't have to be a {SearchParameters}, just an object containing the properties you need from it.
 * @return {AlgoliaSearchHelper} The helper instance
 */
function algoliasearchHelper(client, index, opts) {
  return new AlgoliaSearchHelper(client, index, opts);
}

/**
 * The version currently used
 * @member module:algoliasearchHelper.version
 * @type {number}
 */
algoliasearchHelper.version = __webpack_require__(/*! ./src/version */ "./node_modules/algoliasearch-helper/src/version.js");

/**
 * Constructor for the Helper.
 * @member module:algoliasearchHelper.AlgoliaSearchHelper
 * @type {AlgoliaSearchHelper}
 */
algoliasearchHelper.AlgoliaSearchHelper = AlgoliaSearchHelper;

/**
 * Constructor for the object containing all the parameters of the search.
 * @member module:algoliasearchHelper.SearchParameters
 * @type {SearchParameters}
 */
algoliasearchHelper.SearchParameters = SearchParameters;

/**
 * Constructor for the object containing the results of the search.
 * @member module:algoliasearchHelper.SearchResults
 * @type {SearchResults}
 */
algoliasearchHelper.SearchResults = SearchResults;

module.exports = algoliasearchHelper;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/DerivedHelper/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/DerivedHelper/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = __webpack_require__(/*! @algolia/events */ "./node_modules/@algolia/events/events.js");

var inherits = __webpack_require__(/*! ../functions/inherits */ "./node_modules/algoliasearch-helper/src/functions/inherits.js");

/**
 * A DerivedHelper is a way to create sub requests to
 * Algolia from a main helper.
 * @class
 * @classdesc The DerivedHelper provides an event based interface for search callbacks:
 *  - search: when a search is triggered using the `search()` method.
 *  - result: when the response is retrieved from Algolia and is processed.
 *    This event contains a {@link SearchResults} object and the
 *    {@link SearchParameters} corresponding to this answer.
 * @param {AlgoliaSearchHelper} mainHelper the main helper
 * @param {function} fn the function to create the derived state
 */
function DerivedHelper(mainHelper, fn) {
  this.main = mainHelper;
  this.fn = fn;
  this.lastResults = null;
}

inherits(DerivedHelper, EventEmitter);

/**
 * Detach this helper from the main helper
 * @return {undefined}
 * @throws Error if the derived helper is already detached
 */
DerivedHelper.prototype.detach = function () {
  this.removeAllListeners();
  this.main.detachDerivedHelper(this);
};

DerivedHelper.prototype.getModifiedState = function (parameters) {
  return this.fn(parameters);
};

module.exports = DerivedHelper;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * Functions to manipulate refinement lists
 *
 * The RefinementList is not formally defined through a prototype but is based
 * on a specific structure.
 *
 * @module SearchParameters.refinementList
 *
 * @typedef {string[]} SearchParameters.refinementList.Refinements
 * @typedef {Object.<string, SearchParameters.refinementList.Refinements>} SearchParameters.refinementList.RefinementList
 */

var defaultsPure = __webpack_require__(/*! ../functions/defaultsPure */ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js");
var objectHasKeys = __webpack_require__(/*! ../functions/objectHasKeys */ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js");
var omit = __webpack_require__(/*! ../functions/omit */ "./node_modules/algoliasearch-helper/src/functions/omit.js");

var lib = {
  /**
   * Adds a refinement to a RefinementList
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} value the value of the refinement, if the value is not a string it will be converted
   * @return {RefinementList} a new and updated refinement list
   */
  addRefinement: function addRefinement(refinementList, attribute, value) {
    if (lib.isRefined(refinementList, attribute, value)) {
      return refinementList;
    }

    var valueAsString = '' + value;

    var facetRefinement = !refinementList[attribute]
      ? [valueAsString]
      : refinementList[attribute].concat(valueAsString);

    var mod = {};

    mod[attribute] = facetRefinement;

    return defaultsPure({}, mod, refinementList);
  },
  /**
   * Removes refinement(s) for an attribute:
   *  - if the value is specified removes the refinement for the value on the attribute
   *  - if no value is specified removes all the refinements for this attribute
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} [value] the value of the refinement
   * @return {RefinementList} a new and updated refinement lst
   */
  removeRefinement: function removeRefinement(
    refinementList,
    attribute,
    value
  ) {
    if (value === undefined) {
      // we use the "filter" form of clearRefinement, since it leaves empty values as-is
      // the form with a string will remove the attribute completely
      return lib.clearRefinement(refinementList, function (v, f) {
        return attribute === f;
      });
    }

    var valueAsString = '' + value;

    return lib.clearRefinement(refinementList, function (v, f) {
      return attribute === f && valueAsString === v;
    });
  },
  /**
   * Toggles the refinement value for an attribute.
   * @param {RefinementList} refinementList the initial list
   * @param {string} attribute the attribute to refine
   * @param {string} value the value of the refinement
   * @return {RefinementList} a new and updated list
   */
  toggleRefinement: function toggleRefinement(
    refinementList,
    attribute,
    value
  ) {
    if (value === undefined)
      throw new Error('toggleRefinement should be used with a value');

    if (lib.isRefined(refinementList, attribute, value)) {
      return lib.removeRefinement(refinementList, attribute, value);
    }

    return lib.addRefinement(refinementList, attribute, value);
  },
  /**
   * Clear all or parts of a RefinementList. Depending on the arguments, three
   * kinds of behavior can happen:
   *  - if no attribute is provided: clears the whole list
   *  - if an attribute is provided as a string: clears the list for the specific attribute
   *  - if an attribute is provided as a function: discards the elements for which the function returns true
   * @param {RefinementList} refinementList the initial list
   * @param {string} [attribute] the attribute or function to discard
   * @param {string} [refinementType] optional parameter to give more context to the attribute function
   * @return {RefinementList} a new and updated refinement list
   */
  clearRefinement: function clearRefinement(
    refinementList,
    attribute,
    refinementType
  ) {
    if (attribute === undefined) {
      // return the same object if the list is already empty
      // this is mainly for tests, as it doesn't have much impact on performance
      if (!objectHasKeys(refinementList)) {
        return refinementList;
      }
      return {};
    } else if (typeof attribute === 'string') {
      return omit(refinementList, [attribute]);
    } else if (typeof attribute === 'function') {
      var hasChanged = false;

      var newRefinementList = Object.keys(refinementList).reduce(function (
        memo,
        key
      ) {
        var values = refinementList[key] || [];
        var facetList = values.filter(function (value) {
          return !attribute(value, key, refinementType);
        });

        if (facetList.length !== values.length) {
          hasChanged = true;
        }

        memo[key] = facetList;

        return memo;
      },
      {});

      if (hasChanged) return newRefinementList;
      return refinementList;
    }

    // We return nothing if the attribute is not undefined, a string or a function,
    // as it is not a valid value for a refinement
    return undefined;
  },
  /**
   * Test if the refinement value is used for the attribute. If no refinement value
   * is provided, test if the refinementList contains any refinement for the
   * given attribute.
   * @param {RefinementList} refinementList the list of refinement
   * @param {string} attribute name of the attribute
   * @param {string} [refinementValue] value of the filter/refinement
   * @return {boolean} true if the attribute is refined, false otherwise
   */
  isRefined: function isRefined(refinementList, attribute, refinementValue) {
    var containsRefinements =
      Boolean(refinementList[attribute]) &&
      refinementList[attribute].length > 0;

    if (refinementValue === undefined || !containsRefinements) {
      return containsRefinements;
    }

    var refinementValueAsString = '' + refinementValue;

    return refinementList[attribute].indexOf(refinementValueAsString) !== -1;
  },
};

module.exports = lib;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchParameters/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchParameters/index.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var defaultsPure = __webpack_require__(/*! ../functions/defaultsPure */ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js");
var find = __webpack_require__(/*! ../functions/find */ "./node_modules/algoliasearch-helper/src/functions/find.js");
var intersection = __webpack_require__(/*! ../functions/intersection */ "./node_modules/algoliasearch-helper/src/functions/intersection.js");
var merge = __webpack_require__(/*! ../functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");
var objectHasKeys = __webpack_require__(/*! ../functions/objectHasKeys */ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js");
var omit = __webpack_require__(/*! ../functions/omit */ "./node_modules/algoliasearch-helper/src/functions/omit.js");
var valToNumber = __webpack_require__(/*! ../functions/valToNumber */ "./node_modules/algoliasearch-helper/src/functions/valToNumber.js");
var isValidUserToken = __webpack_require__(/*! ../utils/isValidUserToken */ "./node_modules/algoliasearch-helper/src/utils/isValidUserToken.js");

var RefinementList = __webpack_require__(/*! ./RefinementList */ "./node_modules/algoliasearch-helper/src/SearchParameters/RefinementList.js");

/**
 * isEqual, but only for numeric refinement values, possible values:
 * - 5
 * - [5]
 * - [[5]]
 * - [[5,5],[4]]
 * @param {any} a numeric refinement value
 * @param {any} b numeric refinement value
 * @return {boolean} true if the values are equal
 */
function isEqualNumericRefinement(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    return (
      a.length === b.length &&
      a.every(function (el, i) {
        return isEqualNumericRefinement(b[i], el);
      })
    );
  }
  return a === b;
}

/**
 * like _.find but using deep equality to be able to use it
 * to find arrays.
 * @private
 * @param {any[]} array array to search into (elements are base or array of base)
 * @param {any} searchedValue the value we're looking for (base or array of base)
 * @return {any} the searched value or undefined
 */
function findArray(array, searchedValue) {
  return find(array, function (currentValue) {
    return isEqualNumericRefinement(currentValue, searchedValue);
  });
}

/**
 * The facet list is the structure used to store the list of values used to
 * filter a single attribute.
 * @typedef {string[]} SearchParameters.FacetList
 */

/**
 * Structure to store numeric filters with the operator as the key. The supported operators
 * are `=`, `>`, `<`, `>=`, `<=` and `!=`.
 * @typedef {Object.<string, Array.<number|number[]>>} SearchParameters.OperatorList
 */

/**
 * SearchParameters is the data structure that contains all the information
 * usable for making a search to Algolia API. It doesn't do the search itself,
 * nor does it contains logic about the parameters.
 * It is an immutable object, therefore it has been created in a way that each
 * changes does not change the object itself but returns a copy with the
 * modification.
 * This object should probably not be instantiated outside of the helper. It will
 * be provided when needed. This object is documented for reference as you'll
 * get it from events generated by the {@link AlgoliaSearchHelper}.
 * If need be, instantiate the Helper from the factory function {@link SearchParameters.make}
 * @constructor
 * @classdesc contains all the parameters of a search
 * @param {object|SearchParameters} newParameters existing parameters or partial object
 * for the properties of a new SearchParameters
 * @see SearchParameters.make
 * @example <caption>SearchParameters of the first query in
 *   <a href="http://demos.algolia.com/instant-search-demo/">the instant search demo</a></caption>
{
   "query": "",
   "disjunctiveFacets": [
      "customerReviewCount",
      "category",
      "salePrice_range",
      "manufacturer"
  ],
   "maxValuesPerFacet": 30,
   "page": 0,
   "hitsPerPage": 10,
   "facets": [
      "type",
      "shipping"
  ]
}
 */
function SearchParameters(newParameters) {
  var params = newParameters
    ? SearchParameters._parseNumbers(newParameters)
    : {};

  if (params.userToken !== undefined && !isValidUserToken(params.userToken)) {
    // eslint-disable-next-line no-console
    console.warn(
      '[algoliasearch-helper] The `userToken` parameter is invalid. This can lead to wrong analytics.\n  - Format: [a-zA-Z0-9_-]{1,64}'
    );
  }
  /**
   * This attribute contains the list of all the conjunctive facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * @member {string[]}
   */
  this.facets = params.facets || [];
  /**
   * This attribute contains the list of all the disjunctive facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * @member {string[]}
   */
  this.disjunctiveFacets = params.disjunctiveFacets || [];
  /**
   * This attribute contains the list of all the hierarchical facets
   * used. This list will be added to requested facets in the
   * [facets attribute](https://www.algolia.com/doc/rest-api/search#param-facets) sent to algolia.
   * Hierarchical facets are a sub type of disjunctive facets that
   * let you filter faceted attributes hierarchically.
   * @member {string[]|object[]}
   */
  this.hierarchicalFacets = params.hierarchicalFacets || [];

  // Refinements
  /**
   * This attribute contains all the filters that need to be
   * applied on the conjunctive facets. Each facet must be properly
   * defined in the `facets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.facetsRefinements = params.facetsRefinements || {};
  /**
   * This attribute contains all the filters that need to be
   * excluded from the conjunctive facets. Each facet must be properly
   * defined in the `facets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters excluded for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.facetsExcludes = params.facetsExcludes || {};
  /**
   * This attribute contains all the filters that need to be
   * applied on the disjunctive facets. Each facet must be properly
   * defined in the `disjunctiveFacets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.disjunctiveFacetsRefinements = params.disjunctiveFacetsRefinements || {};
  /**
   * This attribute contains all the filters that need to be
   * applied on the numeric attributes.
   *
   * The key is the name of the attribute, and the value is the
   * filters to apply to this attribute.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `numericFilters` attribute.
   * @member {Object.<string, SearchParameters.OperatorList>}
   */
  this.numericRefinements = params.numericRefinements || {};
  /**
   * This attribute contains all the tags used to refine the query.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `tagFilters` attribute.
   * @member {string[]}
   */
  this.tagRefinements = params.tagRefinements || [];
  /**
   * This attribute contains all the filters that need to be
   * applied on the hierarchical facets. Each facet must be properly
   * defined in the `hierarchicalFacets` attribute.
   *
   * The key is the name of the facet, and the `FacetList` contains all
   * filters selected for the associated facet name. The FacetList values
   * are structured as a string that contain the values for each level
   * separated by the configured separator.
   *
   * When querying algolia, the values stored in this attribute will
   * be translated into the `facetFilters` attribute.
   * @member {Object.<string, SearchParameters.FacetList>}
   */
  this.hierarchicalFacetsRefinements =
    params.hierarchicalFacetsRefinements || {};

  // eslint-disable-next-line consistent-this
  var self = this;
  Object.keys(params).forEach(function (paramName) {
    var isKeyKnown = SearchParameters.PARAMETERS.indexOf(paramName) !== -1;
    var isValueDefined = params[paramName] !== undefined;

    if (!isKeyKnown && isValueDefined) {
      self[paramName] = params[paramName];
    }
  });
}

/**
 * List all the properties in SearchParameters and therefore all the known Algolia properties
 * This doesn't contain any beta/hidden features.
 * @private
 */
SearchParameters.PARAMETERS = Object.keys(new SearchParameters());

/**
 * @private
 * @param {object} partialState full or part of a state
 * @return {object} a new object with the number keys as number
 */
SearchParameters._parseNumbers = function (partialState) {
  // Do not parse numbers again in SearchParameters, they ought to be parsed already
  if (partialState instanceof SearchParameters) return partialState;

  var numbers = {};

  var numberKeys = [
    'aroundPrecision',
    'aroundRadius',
    'getRankingInfo',
    'minWordSizefor2Typos',
    'minWordSizefor1Typo',
    'page',
    'maxValuesPerFacet',
    'distinct',
    'minimumAroundRadius',
    'hitsPerPage',
    'minProximity',
  ];

  numberKeys.forEach(function (k) {
    var value = partialState[k];
    if (typeof value === 'string') {
      var parsedValue = parseFloat(value);
      // global isNaN is ok to use here, value is only number or NaN
      numbers[k] = isNaN(parsedValue) ? value : parsedValue;
    }
  });

  // there's two formats of insideBoundingBox, we need to parse
  // the one which is an array of float geo rectangles
  if (Array.isArray(partialState.insideBoundingBox)) {
    numbers.insideBoundingBox = partialState.insideBoundingBox.map(function (
      geoRect
    ) {
      if (Array.isArray(geoRect)) {
        return geoRect.map(function (value) {
          return parseFloat(value);
        });
      }
      return geoRect;
    });
  }

  if (partialState.numericRefinements) {
    var numericRefinements = {};
    Object.keys(partialState.numericRefinements).forEach(function (attribute) {
      var operators = partialState.numericRefinements[attribute] || {};
      numericRefinements[attribute] = {};
      Object.keys(operators).forEach(function (operator) {
        var values = operators[operator];
        var parsedValues = values.map(function (v) {
          if (Array.isArray(v)) {
            return v.map(function (vPrime) {
              if (typeof vPrime === 'string') {
                return parseFloat(vPrime);
              }
              return vPrime;
            });
          } else if (typeof v === 'string') {
            return parseFloat(v);
          }
          return v;
        });
        numericRefinements[attribute][operator] = parsedValues;
      });
    });
    numbers.numericRefinements = numericRefinements;
  }

  return merge({}, partialState, numbers);
};

/**
 * Factory for SearchParameters
 * @param {object|SearchParameters} newParameters existing parameters or partial
 * object for the properties of a new SearchParameters
 * @return {SearchParameters} frozen instance of SearchParameters
 */
SearchParameters.make = function makeSearchParameters(newParameters) {
  var instance = new SearchParameters(newParameters);

  var hierarchicalFacets = newParameters.hierarchicalFacets || [];
  hierarchicalFacets.forEach(function (facet) {
    if (facet.rootPath) {
      var currentRefinement = instance.getHierarchicalRefinement(facet.name);

      if (
        currentRefinement.length > 0 &&
        currentRefinement[0].indexOf(facet.rootPath) !== 0
      ) {
        instance = instance.clearRefinements(facet.name);
      }

      // get it again in case it has been cleared
      currentRefinement = instance.getHierarchicalRefinement(facet.name);
      if (currentRefinement.length === 0) {
        instance = instance.toggleHierarchicalFacetRefinement(
          facet.name,
          facet.rootPath
        );
      }
    }
  });

  return instance;
};

/**
 * Validates the new parameters based on the previous state
 * @param {SearchParameters} currentState the current state
 * @param {object|SearchParameters} parameters the new parameters to set
 * @return {Error|null} Error if the modification is invalid, null otherwise
 */
SearchParameters.validate = function (currentState, parameters) {
  var params = parameters || {};

  if (
    currentState.tagFilters &&
    params.tagRefinements &&
    params.tagRefinements.length > 0
  ) {
    return new Error(
      '[Tags] Cannot switch from the managed tag API to the advanced API. It is probably ' +
        'an error, if it is really what you want, you should first clear the tags with clearTags method.'
    );
  }

  if (currentState.tagRefinements.length > 0 && params.tagFilters) {
    return new Error(
      '[Tags] Cannot switch from the advanced tag API to the managed API. It is probably ' +
        'an error, if it is not, you should first clear the tags with clearTags method.'
    );
  }

  if (
    currentState.numericFilters &&
    params.numericRefinements &&
    objectHasKeys(params.numericRefinements)
  ) {
    return new Error(
      "[Numeric filters] Can't switch from the advanced to the managed API. It" +
        ' is probably an error, if this is really what you want, you have to first' +
        ' clear the numeric filters.'
    );
  }

  if (objectHasKeys(currentState.numericRefinements) && params.numericFilters) {
    return new Error(
      "[Numeric filters] Can't switch from the managed API to the advanced. It" +
        ' is probably an error, if this is really what you want, you have to first' +
        ' clear the numeric filters.'
    );
  }

  return null;
};

SearchParameters.prototype = {
  constructor: SearchParameters,

  /**
   * Remove all refinements (disjunctive + conjunctive + excludes + numeric filters)
   * @method
   * @param {undefined|string|SearchParameters.clearCallback} [attribute] optional string or function
   * - If not given, means to clear all the filters.
   * - If `string`, means to clear all refinements for the `attribute` named filter.
   * - If `function`, means to clear all the refinements that return truthy values.
   * @return {SearchParameters} new instance with filters cleared
   */
  clearRefinements: function clearRefinements(attribute) {
    var patch = {
      numericRefinements: this._clearNumericRefinements(attribute),
      facetsRefinements: RefinementList.clearRefinement(
        this.facetsRefinements,
        attribute,
        'conjunctiveFacet'
      ),
      facetsExcludes: RefinementList.clearRefinement(
        this.facetsExcludes,
        attribute,
        'exclude'
      ),
      disjunctiveFacetsRefinements: RefinementList.clearRefinement(
        this.disjunctiveFacetsRefinements,
        attribute,
        'disjunctiveFacet'
      ),
      hierarchicalFacetsRefinements: RefinementList.clearRefinement(
        this.hierarchicalFacetsRefinements,
        attribute,
        'hierarchicalFacet'
      ),
    };
    if (
      patch.numericRefinements === this.numericRefinements &&
      patch.facetsRefinements === this.facetsRefinements &&
      patch.facetsExcludes === this.facetsExcludes &&
      patch.disjunctiveFacetsRefinements ===
        this.disjunctiveFacetsRefinements &&
      patch.hierarchicalFacetsRefinements === this.hierarchicalFacetsRefinements
    ) {
      return this;
    }
    return this.setQueryParameters(patch);
  },
  /**
   * Remove all the refined tags from the SearchParameters
   * @method
   * @return {SearchParameters} new instance with tags cleared
   */
  clearTags: function clearTags() {
    if (this.tagFilters === undefined && this.tagRefinements.length === 0)
      return this;

    return this.setQueryParameters({
      tagFilters: undefined,
      tagRefinements: [],
    });
  },
  /**
   * Set the index.
   * @method
   * @param {string} index the index name
   * @return {SearchParameters} new instance
   */
  setIndex: function setIndex(index) {
    if (index === this.index) return this;

    return this.setQueryParameters({
      index: index,
    });
  },
  /**
   * Query setter
   * @method
   * @param {string} newQuery value for the new query
   * @return {SearchParameters} new instance
   */
  setQuery: function setQuery(newQuery) {
    if (newQuery === this.query) return this;

    return this.setQueryParameters({
      query: newQuery,
    });
  },
  /**
   * Page setter
   * @method
   * @param {number} newPage new page number
   * @return {SearchParameters} new instance
   */
  setPage: function setPage(newPage) {
    if (newPage === this.page) return this;

    return this.setQueryParameters({
      page: newPage,
    });
  },
  /**
   * Facets setter
   * The facets are the simple facets, used for conjunctive (and) faceting.
   * @method
   * @param {string[]} facets all the attributes of the algolia records used for conjunctive faceting
   * @return {SearchParameters} new instance
   */
  setFacets: function setFacets(facets) {
    return this.setQueryParameters({
      facets: facets,
    });
  },
  /**
   * Disjunctive facets setter
   * Change the list of disjunctive (or) facets the helper chan handle.
   * @method
   * @param {string[]} facets all the attributes of the algolia records used for disjunctive faceting
   * @return {SearchParameters} new instance
   */
  setDisjunctiveFacets: function setDisjunctiveFacets(facets) {
    return this.setQueryParameters({
      disjunctiveFacets: facets,
    });
  },
  /**
   * HitsPerPage setter
   * Hits per page represents the number of hits retrieved for this query
   * @method
   * @param {number} n number of hits retrieved per page of results
   * @return {SearchParameters} new instance
   */
  setHitsPerPage: function setHitsPerPage(n) {
    if (this.hitsPerPage === n) return this;

    return this.setQueryParameters({
      hitsPerPage: n,
    });
  },
  /**
   * typoTolerance setter
   * Set the value of typoTolerance
   * @method
   * @param {string} typoTolerance new value of typoTolerance ("true", "false", "min" or "strict")
   * @return {SearchParameters} new instance
   */
  setTypoTolerance: function setTypoTolerance(typoTolerance) {
    if (this.typoTolerance === typoTolerance) return this;

    return this.setQueryParameters({
      typoTolerance: typoTolerance,
    });
  },
  /**
   * Add a numeric filter for a given attribute
   * When value is an array, they are combined with OR
   * When value is a single value, it will combined with AND
   * @method
   * @param {string} attribute attribute to set the filter on
   * @param {string} operator operator of the filter (possible values: =, >, >=, <, <=, !=)
   * @param {number | number[]} value value of the filter
   * @return {SearchParameters} new instance
   * @example
   * // for price = 50 or 40
   * state.addNumericRefinement('price', '=', [50, 40]);
   * @example
   * // for size = 38 and 40
   * state.addNumericRefinement('size', '=', 38);
   * state.addNumericRefinement('size', '=', 40);
   */
  addNumericRefinement: function (attribute, operator, value) {
    var val = valToNumber(value);

    if (this.isNumericRefined(attribute, operator, val)) return this;

    var mod = merge({}, this.numericRefinements);

    mod[attribute] = merge({}, mod[attribute]);

    if (mod[attribute][operator]) {
      // Array copy
      mod[attribute][operator] = mod[attribute][operator].slice();
      // Add the element. Concat can't be used here because value can be an array.
      mod[attribute][operator].push(val);
    } else {
      mod[attribute][operator] = [val];
    }

    return this.setQueryParameters({
      numericRefinements: mod,
    });
  },
  /**
   * Get the list of conjunctive refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getConjunctiveRefinements: function (facetName) {
    if (!this.isConjunctiveFacet(facetName)) {
      return [];
    }
    return this.facetsRefinements[facetName] || [];
  },
  /**
   * Get the list of disjunctive refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getDisjunctiveRefinements: function (facetName) {
    if (!this.isDisjunctiveFacet(facetName)) {
      return [];
    }
    return this.disjunctiveFacetsRefinements[facetName] || [];
  },
  /**
   * Get the list of hierarchical refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getHierarchicalRefinement: function (facetName) {
    // we send an array but we currently do not support multiple
    // hierarchicalRefinements for a hierarchicalFacet
    return this.hierarchicalFacetsRefinements[facetName] || [];
  },
  /**
   * Get the list of exclude refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {string[]} list of refinements
   */
  getExcludeRefinements: function (facetName) {
    if (!this.isConjunctiveFacet(facetName)) {
      return [];
    }
    return this.facetsExcludes[facetName] || [];
  },

  /**
   * Remove all the numeric filter for a given (attribute, operator)
   * @method
   * @param {string} attribute attribute to set the filter on
   * @param {string} [operator] operator of the filter (possible values: =, >, >=, <, <=, !=)
   * @param {number} [number] the value to be removed
   * @return {SearchParameters} new instance
   */
  removeNumericRefinement: function (attribute, operator, number) {
    var paramValue = number;
    if (paramValue !== undefined) {
      if (!this.isNumericRefined(attribute, operator, paramValue)) {
        return this;
      }
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function (
          value,
          key
        ) {
          return (
            key === attribute &&
            value.op === operator &&
            isEqualNumericRefinement(value.val, valToNumber(paramValue))
          );
        }),
      });
    } else if (operator !== undefined) {
      if (!this.isNumericRefined(attribute, operator)) return this;
      return this.setQueryParameters({
        numericRefinements: this._clearNumericRefinements(function (
          value,
          key
        ) {
          return key === attribute && value.op === operator;
        }),
      });
    }

    if (!this.isNumericRefined(attribute)) return this;
    return this.setQueryParameters({
      numericRefinements: this._clearNumericRefinements(function (value, key) {
        return key === attribute;
      }),
    });
  },
  /**
   * Get the list of numeric refinements for a single facet
   * @param {string} facetName name of the attribute used for faceting
   * @return {SearchParameters.OperatorList} list of refinements
   */
  getNumericRefinements: function (facetName) {
    return this.numericRefinements[facetName] || {};
  },
  /**
   * Return the current refinement for the (attribute, operator)
   * @param {string} attribute attribute in the record
   * @param {string} operator operator applied on the refined values
   * @return {Array.<number|number[]>} refined values
   */
  getNumericRefinement: function (attribute, operator) {
    return (
      this.numericRefinements[attribute] &&
      this.numericRefinements[attribute][operator]
    );
  },
  /**
   * Clear numeric filters.
   * @method
   * @private
   * @param {string|SearchParameters.clearCallback} [attribute] optional string or function
   * - If not given, means to clear all the filters.
   * - If `string`, means to clear all refinements for the `attribute` named filter.
   * - If `function`, means to clear all the refinements that return truthy values.
   * @return {Object.<string, OperatorList>} new numeric refinements
   */
  _clearNumericRefinements: function _clearNumericRefinements(attribute) {
    if (attribute === undefined) {
      if (!objectHasKeys(this.numericRefinements)) {
        return this.numericRefinements;
      }
      return {};
    } else if (typeof attribute === 'string') {
      return omit(this.numericRefinements, [attribute]);
    } else if (typeof attribute === 'function') {
      var hasChanged = false;
      var numericRefinements = this.numericRefinements;
      var newNumericRefinements = Object.keys(numericRefinements).reduce(
        function (memo, key) {
          var operators = numericRefinements[key];
          var operatorList = {};

          operators = operators || {};
          Object.keys(operators).forEach(function (operator) {
            var values = operators[operator] || [];
            var outValues = [];
            values.forEach(function (value) {
              var predicateResult = attribute(
                { val: value, op: operator },
                key,
                'numeric'
              );
              if (!predicateResult) outValues.push(value);
            });
            if (outValues.length !== values.length) {
              hasChanged = true;
            }
            operatorList[operator] = outValues;
          });

          memo[key] = operatorList;

          return memo;
        },
        {}
      );

      if (hasChanged) return newNumericRefinements;
      return this.numericRefinements;
    }

    // We return nothing if the attribute is not undefined, a string or a function,
    // as it is not a valid value for a refinement
    return undefined;
  },
  /**
   * Add a facet to the facets attribute of the helper configuration, if it
   * isn't already present.
   * @method
   * @param {string} facet facet name to add
   * @return {SearchParameters} new instance
   */
  addFacet: function addFacet(facet) {
    if (this.isConjunctiveFacet(facet)) {
      return this;
    }

    return this.setQueryParameters({
      facets: this.facets.concat([facet]),
    });
  },
  /**
   * Add a disjunctive facet to the disjunctiveFacets attribute of the helper
   * configuration, if it isn't already present.
   * @method
   * @param {string} facet disjunctive facet name to add
   * @return {SearchParameters} new instance
   */
  addDisjunctiveFacet: function addDisjunctiveFacet(facet) {
    if (this.isDisjunctiveFacet(facet)) {
      return this;
    }

    return this.setQueryParameters({
      disjunctiveFacets: this.disjunctiveFacets.concat([facet]),
    });
  },
  /**
   * Add a hierarchical facet to the hierarchicalFacets attribute of the helper
   * configuration.
   * @method
   * @param {object} hierarchicalFacet hierarchical facet to add
   * @return {SearchParameters} new instance
   * @throws will throw an error if a hierarchical facet with the same name was already declared
   */
  addHierarchicalFacet: function addHierarchicalFacet(hierarchicalFacet) {
    if (this.isHierarchicalFacet(hierarchicalFacet.name)) {
      throw new Error(
        'Cannot declare two hierarchical facets with the same name: `' +
          hierarchicalFacet.name +
          '`'
      );
    }

    return this.setQueryParameters({
      hierarchicalFacets: this.hierarchicalFacets.concat([hierarchicalFacet]),
    });
  },
  /**
   * Add a refinement on a "normal" facet
   * @method
   * @param {string} facet attribute to apply the faceting on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters} new instance
   */
  addFacetRefinement: function addFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the facets attribute of the helper configuration'
      );
    }
    if (RefinementList.isRefined(this.facetsRefinements, facet, value))
      return this;

    return this.setQueryParameters({
      facetsRefinements: RefinementList.addRefinement(
        this.facetsRefinements,
        facet,
        value
      ),
    });
  },
  /**
   * Exclude a value from a "normal" facet
   * @method
   * @param {string} facet attribute to apply the exclusion on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters} new instance
   */
  addExcludeRefinement: function addExcludeRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the facets attribute of the helper configuration'
      );
    }
    if (RefinementList.isRefined(this.facetsExcludes, facet, value))
      return this;

    return this.setQueryParameters({
      facetsExcludes: RefinementList.addRefinement(
        this.facetsExcludes,
        facet,
        value
      ),
    });
  },
  /**
   * Adds a refinement on a disjunctive facet.
   * @method
   * @param {string} facet attribute to apply the faceting on
   * @param {string} value value of the attribute (will be converted to string)
   * @return {SearchParameters} new instance
   */
  addDisjunctiveFacetRefinement: function addDisjunctiveFacetRefinement(
    facet,
    value
  ) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the disjunctiveFacets attribute of the helper configuration'
      );
    }

    if (
      RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)
    )
      return this;

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.addRefinement(
        this.disjunctiveFacetsRefinements,
        facet,
        value
      ),
    });
  },
  /**
   * addTagRefinement adds a tag to the list used to filter the results
   * @param {string} tag tag to be added
   * @return {SearchParameters} new instance
   */
  addTagRefinement: function addTagRefinement(tag) {
    if (this.isTagRefined(tag)) return this;

    var modification = {
      tagRefinements: this.tagRefinements.concat(tag),
    };

    return this.setQueryParameters(modification);
  },
  /**
   * Remove a facet from the facets attribute of the helper configuration, if it
   * is present.
   * @method
   * @param {string} facet facet name to remove
   * @return {SearchParameters} new instance
   */
  removeFacet: function removeFacet(facet) {
    if (!this.isConjunctiveFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      facets: this.facets.filter(function (f) {
        return f !== facet;
      }),
    });
  },
  /**
   * Remove a disjunctive facet from the disjunctiveFacets attribute of the
   * helper configuration, if it is present.
   * @method
   * @param {string} facet disjunctive facet name to remove
   * @return {SearchParameters} new instance
   */
  removeDisjunctiveFacet: function removeDisjunctiveFacet(facet) {
    if (!this.isDisjunctiveFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      disjunctiveFacets: this.disjunctiveFacets.filter(function (f) {
        return f !== facet;
      }),
    });
  },
  /**
   * Remove a hierarchical facet from the hierarchicalFacets attribute of the
   * helper configuration, if it is present.
   * @method
   * @param {string} facet hierarchical facet name to remove
   * @return {SearchParameters} new instance
   */
  removeHierarchicalFacet: function removeHierarchicalFacet(facet) {
    if (!this.isHierarchicalFacet(facet)) {
      return this;
    }

    return this.clearRefinements(facet).setQueryParameters({
      hierarchicalFacets: this.hierarchicalFacets.filter(function (f) {
        return f.name !== facet;
      }),
    });
  },
  /**
   * Remove a refinement set on facet. If a value is provided, it will clear the
   * refinement for the given value, otherwise it will clear all the refinement
   * values for the faceted attribute.
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {string} [value] value used to filter
   * @return {SearchParameters} new instance
   */
  removeFacetRefinement: function removeFacetRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the facets attribute of the helper configuration'
      );
    }
    if (!RefinementList.isRefined(this.facetsRefinements, facet, value))
      return this;

    return this.setQueryParameters({
      facetsRefinements: RefinementList.removeRefinement(
        this.facetsRefinements,
        facet,
        value
      ),
    });
  },
  /**
   * Remove a negative refinement on a facet
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {string} value value used to filter
   * @return {SearchParameters} new instance
   */
  removeExcludeRefinement: function removeExcludeRefinement(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the facets attribute of the helper configuration'
      );
    }
    if (!RefinementList.isRefined(this.facetsExcludes, facet, value))
      return this;

    return this.setQueryParameters({
      facetsExcludes: RefinementList.removeRefinement(
        this.facetsExcludes,
        facet,
        value
      ),
    });
  },
  /**
   * Remove a refinement on a disjunctive facet
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {string} value value used to filter
   * @return {SearchParameters} new instance
   */
  removeDisjunctiveFacetRefinement: function removeDisjunctiveFacetRefinement(
    facet,
    value
  ) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the disjunctiveFacets attribute of the helper configuration'
      );
    }
    if (
      !RefinementList.isRefined(this.disjunctiveFacetsRefinements, facet, value)
    )
      return this;

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.removeRefinement(
        this.disjunctiveFacetsRefinements,
        facet,
        value
      ),
    });
  },
  /**
   * Remove a tag from the list of tag refinements
   * @method
   * @param {string} tag the tag to remove
   * @return {SearchParameters} new instance
   */
  removeTagRefinement: function removeTagRefinement(tag) {
    if (!this.isTagRefined(tag)) return this;

    var modification = {
      tagRefinements: this.tagRefinements.filter(function (t) {
        return t !== tag;
      }),
    };

    return this.setQueryParameters(modification);
  },
  /**
   * Generic toggle refinement method to use with facet, disjunctive facets
   * and hierarchical facets
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {SearchParameters} new instance
   * @throws will throw an error if the facet is not declared in the settings of the helper
   * @deprecated since version 2.19.0, see {@link SearchParameters#toggleFacetRefinement}
   */
  toggleRefinement: function toggleRefinement(facet, value) {
    return this.toggleFacetRefinement(facet, value);
  },
  /**
   * Generic toggle refinement method to use with facet, disjunctive facets
   * and hierarchical facets
   * @param  {string} facet the facet to refine
   * @param  {string} value the associated value
   * @return {SearchParameters} new instance
   * @throws will throw an error if the facet is not declared in the settings of the helper
   */
  toggleFacetRefinement: function toggleFacetRefinement(facet, value) {
    if (this.isHierarchicalFacet(facet)) {
      return this.toggleHierarchicalFacetRefinement(facet, value);
    } else if (this.isConjunctiveFacet(facet)) {
      return this.toggleConjunctiveFacetRefinement(facet, value);
    } else if (this.isDisjunctiveFacet(facet)) {
      return this.toggleDisjunctiveFacetRefinement(facet, value);
    }

    throw new Error(
      'Cannot refine the undeclared facet ' +
        facet +
        '; it should be added to the helper options facets, disjunctiveFacets or hierarchicalFacets'
    );
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters} new instance
   */
  toggleConjunctiveFacetRefinement: function toggleConjunctiveFacetRefinement(
    facet,
    value
  ) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the facets attribute of the helper configuration'
      );
    }

    return this.setQueryParameters({
      facetsRefinements: RefinementList.toggleRefinement(
        this.facetsRefinements,
        facet,
        value
      ),
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters} new instance
   */
  toggleExcludeFacetRefinement: function toggleExcludeFacetRefinement(
    facet,
    value
  ) {
    if (!this.isConjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the facets attribute of the helper configuration'
      );
    }

    return this.setQueryParameters({
      facetsExcludes: RefinementList.toggleRefinement(
        this.facetsExcludes,
        facet,
        value
      ),
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters} new instance
   */
  toggleDisjunctiveFacetRefinement: function toggleDisjunctiveFacetRefinement(
    facet,
    value
  ) {
    if (!this.isDisjunctiveFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the disjunctiveFacets attribute of the helper configuration'
      );
    }

    return this.setQueryParameters({
      disjunctiveFacetsRefinements: RefinementList.toggleRefinement(
        this.disjunctiveFacetsRefinements,
        facet,
        value
      ),
    });
  },
  /**
   * Switch the refinement applied over a facet/value
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {SearchParameters} new instance
   */
  toggleHierarchicalFacetRefinement: function toggleHierarchicalFacetRefinement(
    facet,
    value
  ) {
    if (!this.isHierarchicalFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the hierarchicalFacets attribute of the helper configuration'
      );
    }

    var separator = this._getHierarchicalFacetSeparator(
      this.getHierarchicalFacetByName(facet)
    );

    var mod = {};

    var upOneOrMultipleLevel =
      this.hierarchicalFacetsRefinements[facet] !== undefined &&
      this.hierarchicalFacetsRefinements[facet].length > 0 &&
      // remove current refinement:
      // refinement was 'beer > IPA', call is toggleRefine('beer > IPA'), refinement should be `beer`
      (this.hierarchicalFacetsRefinements[facet][0] === value ||
        // remove a parent refinement of the current refinement:
        //  - refinement was 'beer > IPA > Flying dog'
        //  - call is toggleRefine('beer > IPA')
        //  - refinement should be `beer`
        this.hierarchicalFacetsRefinements[facet][0].indexOf(
          value + separator
        ) === 0);

    if (upOneOrMultipleLevel) {
      if (value.indexOf(separator) === -1) {
        // go back to root level
        mod[facet] = [];
      } else {
        mod[facet] = [value.slice(0, value.lastIndexOf(separator))];
      }
    } else {
      mod[facet] = [value];
    }

    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaultsPure(
        {},
        mod,
        this.hierarchicalFacetsRefinements
      ),
    });
  },

  /**
   * Adds a refinement on a hierarchical facet.
   * @param {string} facet the facet name
   * @param {string} path the hierarchical facet path
   * @return {SearchParameter} the new state
   * @throws Error if the facet is not defined or if the facet is refined
   */
  addHierarchicalFacetRefinement: function (facet, path) {
    if (this.isHierarchicalFacetRefined(facet)) {
      throw new Error(facet + ' is already refined.');
    }
    if (!this.isHierarchicalFacet(facet)) {
      throw new Error(
        facet +
          ' is not defined in the hierarchicalFacets attribute of the helper configuration.'
      );
    }
    var mod = {};
    mod[facet] = [path];
    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaultsPure(
        {},
        mod,
        this.hierarchicalFacetsRefinements
      ),
    });
  },

  /**
   * Removes the refinement set on a hierarchical facet.
   * @param {string} facet the facet name
   * @return {SearchParameter} the new state
   * @throws Error if the facet is not defined or if the facet is not refined
   */
  removeHierarchicalFacetRefinement: function (facet) {
    if (!this.isHierarchicalFacetRefined(facet)) {
      return this;
    }
    var mod = {};
    mod[facet] = [];
    return this.setQueryParameters({
      hierarchicalFacetsRefinements: defaultsPure(
        {},
        mod,
        this.hierarchicalFacetsRefinements
      ),
    });
  },
  /**
   * Switch the tag refinement
   * @method
   * @param {string} tag the tag to remove or add
   * @return {SearchParameters} new instance
   */
  toggleTagRefinement: function toggleTagRefinement(tag) {
    if (this.isTagRefined(tag)) {
      return this.removeTagRefinement(tag);
    }

    return this.addTagRefinement(tag);
  },
  /**
   * Test if the facet name is from one of the disjunctive facets
   * @method
   * @param {string} facet facet name to test
   * @return {boolean} true if facet is a disjunctive facet
   */
  isDisjunctiveFacet: function (facet) {
    return this.disjunctiveFacets.indexOf(facet) > -1;
  },
  /**
   * Test if the facet name is from one of the hierarchical facets
   * @method
   * @param {string} facetName facet name to test
   * @return {boolean} true if facetName is a hierarchical facet
   */
  isHierarchicalFacet: function (facetName) {
    return this.getHierarchicalFacetByName(facetName) !== undefined;
  },
  /**
   * Test if the facet name is from one of the conjunctive/normal facets
   * @method
   * @param {string} facet facet name to test
   * @return {boolean} true if facet is a conjunctive facet
   */
  isConjunctiveFacet: function (facet) {
    return this.facets.indexOf(facet) > -1;
  },
  /**
   * Returns true if the facet is refined, either for a specific value or in
   * general.
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} value, optional value. If passed will test that this value
   * is filtering the given facet.
   * @return {boolean} returns true if refined
   */
  isFacetRefined: function isFacetRefined(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      return false;
    }
    return RefinementList.isRefined(this.facetsRefinements, facet, value);
  },
  /**
   * Returns true if the facet contains exclusions or if a specific value is
   * excluded.
   *
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} [value] optional value. If passed will test that this value
   * is filtering the given facet.
   * @return {boolean} returns true if refined
   */
  isExcludeRefined: function isExcludeRefined(facet, value) {
    if (!this.isConjunctiveFacet(facet)) {
      return false;
    }
    return RefinementList.isRefined(this.facetsExcludes, facet, value);
  },
  /**
   * Returns true if the facet contains a refinement, or if a value passed is a
   * refinement for the facet.
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} value optional, will test if the value is used for refinement
   * if there is one, otherwise will test if the facet contains any refinement
   * @return {boolean} true if the facet is refined
   */
  isDisjunctiveFacetRefined: function isDisjunctiveFacetRefined(facet, value) {
    if (!this.isDisjunctiveFacet(facet)) {
      return false;
    }
    return RefinementList.isRefined(
      this.disjunctiveFacetsRefinements,
      facet,
      value
    );
  },
  /**
   * Returns true if the facet contains a refinement, or if a value passed is a
   * refinement for the facet.
   * @method
   * @param {string} facet name of the attribute for used for faceting
   * @param {string} value optional, will test if the value is used for refinement
   * if there is one, otherwise will test if the facet contains any refinement
   * @return {boolean} true if the facet is refined
   */
  isHierarchicalFacetRefined: function isHierarchicalFacetRefined(
    facet,
    value
  ) {
    if (!this.isHierarchicalFacet(facet)) {
      return false;
    }

    var refinements = this.getHierarchicalRefinement(facet);

    if (!value) {
      return refinements.length > 0;
    }

    return refinements.indexOf(value) !== -1;
  },
  /**
   * Test if the triple (attribute, operator, value) is already refined.
   * If only the attribute and the operator are provided, it tests if the
   * contains any refinement value.
   * @method
   * @param {string} attribute attribute for which the refinement is applied
   * @param {string} [operator] operator of the refinement
   * @param {string} [value] value of the refinement
   * @return {boolean} true if it is refined
   */
  isNumericRefined: function isNumericRefined(attribute, operator, value) {
    if (value === undefined && operator === undefined) {
      return Boolean(this.numericRefinements[attribute]);
    }

    var isOperatorDefined =
      this.numericRefinements[attribute] &&
      this.numericRefinements[attribute][operator] !== undefined;

    if (value === undefined || !isOperatorDefined) {
      return isOperatorDefined;
    }

    var parsedValue = valToNumber(value);
    var isAttributeValueDefined =
      findArray(this.numericRefinements[attribute][operator], parsedValue) !==
      undefined;

    return isOperatorDefined && isAttributeValueDefined;
  },
  /**
   * Returns true if the tag refined, false otherwise
   * @method
   * @param {string} tag the tag to check
   * @return {boolean} true if tag is refined
   */
  isTagRefined: function isTagRefined(tag) {
    return this.tagRefinements.indexOf(tag) !== -1;
  },
  /**
   * Returns the list of all disjunctive facets refined
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {string[]} returns the list of refinements
   */
  getRefinedDisjunctiveFacets: function getRefinedDisjunctiveFacets() {
    // eslint-disable-next-line consistent-this
    var self = this;

    // attributes used for numeric filter can also be disjunctive
    var disjunctiveNumericRefinedFacets = intersection(
      Object.keys(this.numericRefinements).filter(function (facet) {
        return Object.keys(self.numericRefinements[facet]).length > 0;
      }),
      this.disjunctiveFacets
    );

    return Object.keys(this.disjunctiveFacetsRefinements)
      .filter(function (facet) {
        return self.disjunctiveFacetsRefinements[facet].length > 0;
      })
      .concat(disjunctiveNumericRefinedFacets)
      .concat(this.getRefinedHierarchicalFacets())
      .sort();
  },
  /**
   * Returns the list of all disjunctive facets refined
   * @method
   * @param {string} facet name of the attribute used for faceting
   * @param {value} value value used for filtering
   * @return {string[]} returns the list of refinements
   */
  getRefinedHierarchicalFacets: function getRefinedHierarchicalFacets() {
    // eslint-disable-next-line consistent-this
    var self = this;
    return intersection(
      // enforce the order between the two arrays,
      // so that refinement name index === hierarchical facet index
      this.hierarchicalFacets.map(function (facet) {
        return facet.name;
      }),
      Object.keys(this.hierarchicalFacetsRefinements).filter(function (facet) {
        return self.hierarchicalFacetsRefinements[facet].length > 0;
      })
    ).sort();
  },
  /**
   * Returned the list of all disjunctive facets not refined
   * @method
   * @return {string[]} returns the list of facets that are not refined
   */
  getUnrefinedDisjunctiveFacets: function () {
    var refinedFacets = this.getRefinedDisjunctiveFacets();

    return this.disjunctiveFacets.filter(function (f) {
      return refinedFacets.indexOf(f) === -1;
    });
  },

  managedParameters: [
    'index',

    'facets',
    'disjunctiveFacets',
    'facetsRefinements',
    'hierarchicalFacets',
    'facetsExcludes',

    'disjunctiveFacetsRefinements',
    'numericRefinements',
    'tagRefinements',
    'hierarchicalFacetsRefinements',
  ],

  getQueryParams: function getQueryParams() {
    var managedParameters = this.managedParameters;

    var queryParams = {};

    // eslint-disable-next-line consistent-this
    var self = this;
    Object.keys(this).forEach(function (paramName) {
      var paramValue = self[paramName];
      if (
        managedParameters.indexOf(paramName) === -1 &&
        paramValue !== undefined
      ) {
        queryParams[paramName] = paramValue;
      }
    });

    return queryParams;
  },
  /**
   * Let the user set a specific value for a given parameter. Will return the
   * same instance if the parameter is invalid or if the value is the same as the
   * previous one.
   * @method
   * @param {string} parameter the parameter name
   * @param {any} value the value to be set, must be compliant with the definition
   * of the attribute on the object
   * @return {SearchParameters} the updated state
   */
  setQueryParameter: function setParameter(parameter, value) {
    if (this[parameter] === value) return this;

    var modification = {};

    modification[parameter] = value;

    return this.setQueryParameters(modification);
  },
  /**
   * Let the user set any of the parameters with a plain object.
   * @method
   * @param {object} params all the keys and the values to be updated
   * @return {SearchParameters} a new updated instance
   */
  setQueryParameters: function setQueryParameters(params) {
    if (!params) return this;

    var error = SearchParameters.validate(this, params);

    if (error) {
      throw error;
    }

    // eslint-disable-next-line consistent-this
    var self = this;
    var nextWithNumbers = SearchParameters._parseNumbers(params);
    var previousPlainObject = Object.keys(this).reduce(function (acc, key) {
      acc[key] = self[key];
      return acc;
    }, {});

    var nextPlainObject = Object.keys(nextWithNumbers).reduce(function (
      previous,
      key
    ) {
      var isPreviousValueDefined = previous[key] !== undefined;
      var isNextValueDefined = nextWithNumbers[key] !== undefined;

      if (isPreviousValueDefined && !isNextValueDefined) {
        return omit(previous, [key]);
      }

      if (isNextValueDefined) {
        previous[key] = nextWithNumbers[key];
      }

      return previous;
    },
    previousPlainObject);

    return new this.constructor(nextPlainObject);
  },

  /**
   * Returns a new instance with the page reset. Two scenarios possible:
   * the page is omitted -> return the given instance
   * the page is set -> return a new instance with a page of 0
   * @return {SearchParameters} a new updated instance
   */
  resetPage: function () {
    if (this.page === undefined) {
      return this;
    }

    return this.setPage(0);
  },

  /**
   * Helper function to get the hierarchicalFacet separator or the default one (`>`)
   * @param  {object} hierarchicalFacet the hierarchicalFacet object
   * @return {string} returns the hierarchicalFacet.separator or `>` as default
   */
  _getHierarchicalFacetSortBy: function (hierarchicalFacet) {
    return hierarchicalFacet.sortBy || ['isRefined:desc', 'name:asc'];
  },

  /**
   * Helper function to get the hierarchicalFacet separator or the default one (`>`)
   * @private
   * @param  {object} hierarchicalFacet the hierarchicalFacet object
   * @return {string} returns the hierarchicalFacet.separator or `>` as default
   */
  _getHierarchicalFacetSeparator: function (hierarchicalFacet) {
    return hierarchicalFacet.separator || ' > ';
  },

  /**
   * Helper function to get the hierarchicalFacet prefix path or null
   * @private
   * @param  {object} hierarchicalFacet the hierarchicalFacet object
   * @return {string} returns the hierarchicalFacet.rootPath or null as default
   */
  _getHierarchicalRootPath: function (hierarchicalFacet) {
    return hierarchicalFacet.rootPath || null;
  },

  /**
   * Helper function to check if we show the parent level of the hierarchicalFacet
   * @private
   * @param  {object} hierarchicalFacet the hierarchicalFacet object
   * @return {string} returns the hierarchicalFacet.showParentLevel or true as default
   */
  _getHierarchicalShowParentLevel: function (hierarchicalFacet) {
    if (typeof hierarchicalFacet.showParentLevel === 'boolean') {
      return hierarchicalFacet.showParentLevel;
    }
    return true;
  },

  /**
   * Helper function to get the hierarchicalFacet by it's name
   * @param  {string} hierarchicalFacetName the hierarchicalFacet name
   * @return {object} a hierarchicalFacet
   */
  getHierarchicalFacetByName: function (hierarchicalFacetName) {
    return find(this.hierarchicalFacets, function (f) {
      return f.name === hierarchicalFacetName;
    });
  },

  /**
   * Get the current breadcrumb for a hierarchical facet, as an array
   * @param  {string} facetName Hierarchical facet name
   * @return {array.<string>} the path as an array of string
   */
  getHierarchicalFacetBreadcrumb: function (facetName) {
    if (!this.isHierarchicalFacet(facetName)) {
      return [];
    }

    var refinement = this.getHierarchicalRefinement(facetName)[0];
    if (!refinement) return [];

    var separator = this._getHierarchicalFacetSeparator(
      this.getHierarchicalFacetByName(facetName)
    );
    var path = refinement.split(separator);
    return path.map(function (part) {
      return part.trim();
    });
  },

  toString: function () {
    return JSON.stringify(this, null, 2);
  },
};

/**
 * Callback used for clearRefinement method
 * @callback SearchParameters.clearCallback
 * @param {OperatorList|FacetList} value the value of the filter
 * @param {string} key the current attribute name
 * @param {string} type `numeric`, `disjunctiveFacet`, `conjunctiveFacet`, `hierarchicalFacet` or `exclude`
 * depending on the type of facet
 * @return {boolean} `true` if the element should be removed. `false` otherwise.
 */
module.exports = SearchParameters;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js ***!
  \*******************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = generateTrees;

var fv = __webpack_require__(/*! ../functions/escapeFacetValue */ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js");
var find = __webpack_require__(/*! ../functions/find */ "./node_modules/algoliasearch-helper/src/functions/find.js");
var prepareHierarchicalFacetSortBy = __webpack_require__(/*! ../functions/formatSort */ "./node_modules/algoliasearch-helper/src/functions/formatSort.js");
var orderBy = __webpack_require__(/*! ../functions/orderBy */ "./node_modules/algoliasearch-helper/src/functions/orderBy.js");
var escapeFacetValue = fv.escapeFacetValue;
var unescapeFacetValue = fv.unescapeFacetValue;

function generateTrees(state) {
  return function generate(hierarchicalFacetResult, hierarchicalFacetIndex) {
    var hierarchicalFacet = state.hierarchicalFacets[hierarchicalFacetIndex];
    var hierarchicalFacetRefinement =
      (state.hierarchicalFacetsRefinements[hierarchicalFacet.name] &&
        state.hierarchicalFacetsRefinements[hierarchicalFacet.name][0]) ||
      '';
    var hierarchicalSeparator =
      state._getHierarchicalFacetSeparator(hierarchicalFacet);
    var hierarchicalRootPath =
      state._getHierarchicalRootPath(hierarchicalFacet);
    var hierarchicalShowParentLevel =
      state._getHierarchicalShowParentLevel(hierarchicalFacet);
    var sortBy = prepareHierarchicalFacetSortBy(
      state._getHierarchicalFacetSortBy(hierarchicalFacet)
    );

    var rootExhaustive = hierarchicalFacetResult.every(function (facetResult) {
      return facetResult.exhaustive;
    });

    var generateTreeFn = generateHierarchicalTree(
      sortBy,
      hierarchicalSeparator,
      hierarchicalRootPath,
      hierarchicalShowParentLevel,
      hierarchicalFacetRefinement
    );

    var results = hierarchicalFacetResult;

    if (hierarchicalRootPath) {
      results = hierarchicalFacetResult.slice(
        hierarchicalRootPath.split(hierarchicalSeparator).length
      );
    }

    return results.reduce(generateTreeFn, {
      name: state.hierarchicalFacets[hierarchicalFacetIndex].name,
      count: null, // root level, no count
      isRefined: true, // root level, always refined
      path: null, // root level, no path
      escapedValue: null,
      exhaustive: rootExhaustive,
      data: null,
    });
  };
}

function generateHierarchicalTree(
  sortBy,
  hierarchicalSeparator,
  hierarchicalRootPath,
  hierarchicalShowParentLevel,
  currentRefinement
) {
  return function generateTree(
    hierarchicalTree,
    hierarchicalFacetResult,
    currentHierarchicalLevel
  ) {
    var parent = hierarchicalTree;

    if (currentHierarchicalLevel > 0) {
      var level = 0;

      parent = hierarchicalTree;

      while (level < currentHierarchicalLevel) {
        /**
         * @type {object[]]} hierarchical data
         */
        var data = parent && Array.isArray(parent.data) ? parent.data : [];
        parent = find(data, function (subtree) {
          return subtree.isRefined;
        });
        level++;
      }
    }

    // we found a refined parent, let's add current level data under it
    if (parent) {
      // filter values in case an object has multiple categories:
      //   {
      //     categories: {
      //       level0: ['beers', 'bières'],
      //       level1: ['beers > IPA', 'bières > Belges']
      //     }
      //   }
      //
      // If parent refinement is `beers`, then we do not want to have `bières > Belges`
      // showing up

      var picked = Object.keys(hierarchicalFacetResult.data)
        .map(function (facetValue) {
          return [facetValue, hierarchicalFacetResult.data[facetValue]];
        })
        .filter(function (tuple) {
          var facetValue = tuple[0];
          return onlyMatchingTree(
            facetValue,
            parent.path || hierarchicalRootPath,
            currentRefinement,
            hierarchicalSeparator,
            hierarchicalRootPath,
            hierarchicalShowParentLevel
          );
        });

      parent.data = orderBy(
        picked.map(function (tuple) {
          var facetValue = tuple[0];
          var facetCount = tuple[1];

          return format(
            facetCount,
            facetValue,
            hierarchicalSeparator,
            unescapeFacetValue(currentRefinement),
            hierarchicalFacetResult.exhaustive
          );
        }),
        sortBy[0],
        sortBy[1]
      );
    }

    return hierarchicalTree;
  };
}

// eslint-disable-next-line max-params
function onlyMatchingTree(
  facetValue,
  parentPath,
  currentRefinement,
  hierarchicalSeparator,
  hierarchicalRootPath,
  hierarchicalShowParentLevel
) {
  // we want the facetValue is a child of hierarchicalRootPath
  if (
    hierarchicalRootPath &&
    (facetValue.indexOf(hierarchicalRootPath) !== 0 ||
      hierarchicalRootPath === facetValue)
  ) {
    return false;
  }

  // we always want root levels (only when there is no prefix path)
  return (
    (!hierarchicalRootPath &&
      facetValue.indexOf(hierarchicalSeparator) === -1) ||
    // if there is a rootPath, being root level mean 1 level under rootPath
    (hierarchicalRootPath &&
      facetValue.split(hierarchicalSeparator).length -
        hierarchicalRootPath.split(hierarchicalSeparator).length ===
        1) ||
    // if current refinement is a root level and current facetValue is a root level,
    // keep the facetValue
    (facetValue.indexOf(hierarchicalSeparator) === -1 &&
      currentRefinement.indexOf(hierarchicalSeparator) === -1) ||
    // currentRefinement is a child of the facet value
    currentRefinement.indexOf(facetValue) === 0 ||
    // facetValue is a child of the current parent, add it
    (facetValue.indexOf(parentPath + hierarchicalSeparator) === 0 &&
      (hierarchicalShowParentLevel ||
        facetValue.indexOf(currentRefinement) === 0))
  );
}

function format(
  facetCount,
  facetValue,
  hierarchicalSeparator,
  currentRefinement,
  exhaustive
) {
  var parts = facetValue.split(hierarchicalSeparator);
  return {
    name: parts[parts.length - 1].trim(),
    path: facetValue,
    escapedValue: escapeFacetValue(facetValue),
    count: facetCount,
    isRefined:
      currentRefinement === facetValue ||
      currentRefinement.indexOf(facetValue + hierarchicalSeparator) === 0,
    exhaustive: exhaustive,
    data: null,
  };
}


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/SearchResults/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/SearchResults/index.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var compact = __webpack_require__(/*! ../functions/compact */ "./node_modules/algoliasearch-helper/src/functions/compact.js");
var defaultsPure = __webpack_require__(/*! ../functions/defaultsPure */ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js");
var fv = __webpack_require__(/*! ../functions/escapeFacetValue */ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js");
var find = __webpack_require__(/*! ../functions/find */ "./node_modules/algoliasearch-helper/src/functions/find.js");
var findIndex = __webpack_require__(/*! ../functions/findIndex */ "./node_modules/algoliasearch-helper/src/functions/findIndex.js");
var formatSort = __webpack_require__(/*! ../functions/formatSort */ "./node_modules/algoliasearch-helper/src/functions/formatSort.js");
var merge = __webpack_require__(/*! ../functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");
var orderBy = __webpack_require__(/*! ../functions/orderBy */ "./node_modules/algoliasearch-helper/src/functions/orderBy.js");
var escapeFacetValue = fv.escapeFacetValue;
var unescapeFacetValue = fv.unescapeFacetValue;

var generateHierarchicalTree = __webpack_require__(/*! ./generate-hierarchical-tree */ "./node_modules/algoliasearch-helper/src/SearchResults/generate-hierarchical-tree.js");

/**
 * @typedef SearchResults.Facet
 * @type {object}
 * @property {string} name name of the attribute in the record
 * @property {object} data the faceting data: value, number of entries
 * @property {object} stats undefined unless facet_stats is retrieved from algolia
 */

/**
 * @typedef SearchResults.HierarchicalFacet
 * @type {object}
 * @property {string} name name of the current value given the hierarchical level, trimmed.
 * If root node, you get the facet name
 * @property {number} count number of objects matching this hierarchical value
 * @property {string} path the current hierarchical value full path
 * @property {boolean} isRefined `true` if the current value was refined, `false` otherwise
 * @property {HierarchicalFacet[]} data sub values for the current level
 */

/**
 * @typedef SearchResults.FacetValue
 * @type {object}
 * @property {string} name the facet value itself
 * @property {number} count times this facet appears in the results
 * @property {boolean} isRefined is the facet currently selected
 * @property {boolean} isExcluded is the facet currently excluded (only for conjunctive facets)
 */

/**
 * @typedef Refinement
 * @type {object}
 * @property {string} type the type of filter used:
 * `numeric`, `facet`, `exclude`, `disjunctive`, `hierarchical`
 * @property {string} attributeName name of the attribute used for filtering
 * @property {string} name the value of the filter
 * @property {number} numericValue the value as a number. Only for numeric filters.
 * @property {string} operator the operator used. Only for numeric filters.
 * @property {number} count the number of computed hits for this filter. Only on facets.
 * @property {boolean} exhaustive if the count is exhaustive
 */

/**
 * Turn an array of attributes in an object of attributes with their position in the array as value
 * @param {string[]} attributes the list of attributes in the record
 * @return {object} the list of attributes indexed by attribute name
 */
function getIndices(attributes) {
  var indices = {};

  attributes.forEach(function (val, idx) {
    indices[val] = idx;
  });

  return indices;
}

function assignFacetStats(dest, facetStats, key) {
  if (facetStats && facetStats[key]) {
    dest.stats = facetStats[key];
  }
}

/**
 * @typedef {Object} HierarchicalFacet
 * @property {string} name
 * @property {string[]} attributes
 */

/**
 * @param {HierarchicalFacet[]} hierarchicalFacets All hierarchical facets
 * @param {string} hierarchicalAttributeName The name of the hierarchical attribute
 * @return {HierarchicalFacet} The hierarchical facet matching the attribute name
 */
function findMatchingHierarchicalFacetFromAttributeName(
  hierarchicalFacets,
  hierarchicalAttributeName
) {
  return find(
    hierarchicalFacets,
    function facetKeyMatchesAttribute(hierarchicalFacet) {
      var facetNames = hierarchicalFacet.attributes || [];
      return facetNames.indexOf(hierarchicalAttributeName) > -1;
    }
  );
}

// eslint-disable-next-line valid-jsdoc
/**
 * Constructor for SearchResults
 * @class
 * @classdesc SearchResults contains the results of a query to Algolia using the
 * {@link AlgoliaSearchHelper}.
 * @param {SearchParameters} state state that led to the response
 * @param {array.<object>} results the results from algolia client
 * @example <caption>SearchResults of the first query in
 * <a href="http://demos.algolia.com/instant-search-demo">the instant search demo</a></caption>
{
   "hitsPerPage": 10,
   "processingTimeMS": 2,
   "facets": [
      {
         "name": "type",
         "data": {
            "HardGood": 6627,
            "BlackTie": 550,
            "Music": 665,
            "Software": 131,
            "Game": 456,
            "Movie": 1571
         },
         "exhaustive": false
      },
      {
         "exhaustive": false,
         "data": {
            "Free shipping": 5507
         },
         "name": "shipping"
      }
  ],
   "hits": [
      {
         "thumbnailImage": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_54x108_s.gif",
         "_highlightResult": {
            "shortDescription": {
               "matchLevel": "none",
               "value": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
               "matchedWords": []
            },
            "category": {
               "matchLevel": "none",
               "value": "Computer Security Software",
               "matchedWords": []
            },
            "manufacturer": {
               "matchedWords": [],
               "value": "Webroot",
               "matchLevel": "none"
            },
            "name": {
               "value": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
               "matchedWords": [],
               "matchLevel": "none"
            }
         },
         "image": "http://img.bbystatic.com/BestBuy_US/images/products/1688/1688832_105x210_sc.jpg",
         "shipping": "Free shipping",
         "bestSellingRank": 4,
         "shortDescription": "Safeguard your PC, Mac, Android and iOS devices with comprehensive Internet protection",
         "url": "http://www.bestbuy.com/site/webroot-secureanywhere-internet-security-3-devi…d=1219060687969&skuId=1688832&cmp=RMX&ky=2d3GfEmNIzjA0vkzveHdZEBgpPCyMnLTJ",
         "name": "Webroot SecureAnywhere Internet Security (3-Device) (1-Year Subscription) - Mac/Windows",
         "category": "Computer Security Software",
         "salePrice_range": "1 - 50",
         "objectID": "1688832",
         "type": "Software",
         "customerReviewCount": 5980,
         "salePrice": 49.99,
         "manufacturer": "Webroot"
      },
      ....
  ],
   "nbHits": 10000,
   "disjunctiveFacets": [
      {
         "exhaustive": false,
         "data": {
            "5": 183,
            "12": 112,
            "7": 149,
            ...
         },
         "name": "customerReviewCount",
         "stats": {
            "max": 7461,
            "avg": 157.939,
            "min": 1
         }
      },
      {
         "data": {
            "Printer Ink": 142,
            "Wireless Speakers": 60,
            "Point & Shoot Cameras": 48,
            ...
         },
         "name": "category",
         "exhaustive": false
      },
      {
         "exhaustive": false,
         "data": {
            "> 5000": 2,
            "1 - 50": 6524,
            "501 - 2000": 566,
            "201 - 500": 1501,
            "101 - 200": 1360,
            "2001 - 5000": 47
         },
         "name": "salePrice_range"
      },
      {
         "data": {
            "Dynex™": 202,
            "Insignia™": 230,
            "PNY": 72,
            ...
         },
         "name": "manufacturer",
         "exhaustive": false
      }
  ],
   "query": "",
   "nbPages": 100,
   "page": 0,
   "index": "bestbuy"
}
 **/
function SearchResults(state, results, options) {
  var mainSubResponse = results[0];

  this._rawResults = results;

  // eslint-disable-next-line consistent-this
  var self = this;

  // https://www.algolia.com/doc/api-reference/api-methods/search/#response
  Object.keys(mainSubResponse).forEach(function (key) {
    self[key] = mainSubResponse[key];
  });

  // Make every key of the result options reachable from the instance
  Object.keys(options || {}).forEach(function (key) {
    self[key] = options[key];
  });

  /**
   * query used to generate the results
   * @name query
   * @member {string}
   * @memberof SearchResults
   * @instance
   */
  /**
   * The query as parsed by the engine given all the rules.
   * @name parsedQuery
   * @member {string}
   * @memberof SearchResults
   * @instance
   */
  /**
   * all the records that match the search parameters. Each record is
   * augmented with a new attribute `_highlightResult`
   * which is an object keyed by attribute and with the following properties:
   * - `value` : the value of the facet highlighted (html)
   * - `matchLevel`: `full`, `partial` or `none`, depending on how the query terms match
   * @name hits
   * @member {object[]}
   * @memberof SearchResults
   * @instance
   */
  /**
   * index where the results come from
   * @name index
   * @member {string}
   * @memberof SearchResults
   * @instance
   */
  /**
   * number of hits per page requested
   * @name hitsPerPage
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * total number of hits of this query on the index
   * @name nbHits
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * total number of pages with respect to the number of hits per page and the total number of hits
   * @name nbPages
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * current page
   * @name page
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  /**
   * The position if the position was guessed by IP.
   * @name aroundLatLng
   * @member {string}
   * @memberof SearchResults
   * @instance
   * @example "48.8637,2.3615",
   */
  /**
   * The radius computed by Algolia.
   * @name automaticRadius
   * @member {string}
   * @memberof SearchResults
   * @instance
   * @example "126792922",
   */
  /**
   * String identifying the server used to serve this request.
   *
   * getRankingInfo needs to be set to `true` for this to be returned
   *
   * @name serverUsed
   * @member {string}
   * @memberof SearchResults
   * @instance
   * @example "c7-use-2.algolia.net",
   */
  /**
   * Boolean that indicates if the computation of the counts did time out.
   * @deprecated
   * @name timeoutCounts
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * Boolean that indicates if the computation of the hits did time out.
   * @deprecated
   * @name timeoutHits
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * True if the counts of the facets is exhaustive
   * @name exhaustiveFacetsCount
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * True if the number of hits is exhaustive
   * @name exhaustiveNbHits
   * @member {boolean}
   * @memberof SearchResults
   * @instance
   */
  /**
   * Contains the userData if they are set by a [query rule](https://www.algolia.com/doc/guides/query-rules/query-rules-overview/).
   * @name userData
   * @member {object[]}
   * @memberof SearchResults
   * @instance
   */
  /**
   * queryID is the unique identifier of the query used to generate the current search results.
   * This value is only available if the `clickAnalytics` search parameter is set to `true`.
   * @name queryID
   * @member {string}
   * @memberof SearchResults
   * @instance
   */

  /**
   * sum of the processing time of all the queries
   * @name processingTimeMS
   * @member {number}
   * @memberof SearchResults
   * @instance
   */
  this.processingTimeMS = results.reduce(function (sum, result) {
    return result.processingTimeMS === undefined
      ? sum
      : sum + result.processingTimeMS;
  }, 0);

  /**
   * disjunctive facets results
   * @member {SearchResults.Facet[]}
   */
  this.disjunctiveFacets = [];
  /**
   * disjunctive facets results
   * @member {SearchResults.HierarchicalFacet[]}
   */
  this.hierarchicalFacets = state.hierarchicalFacets.map(
    function initFutureTree() {
      return [];
    }
  );
  /**
   * other facets results
   * @member {SearchResults.Facet[]}
   */
  this.facets = [];

  var disjunctiveFacets = state.getRefinedDisjunctiveFacets();

  var facetsIndices = getIndices(state.facets);
  var disjunctiveFacetsIndices = getIndices(state.disjunctiveFacets);
  var nextDisjunctiveResult = 1;

  // Since we send request only for disjunctive facets that have been refined,
  // we get the facets information from the first, general, response.

  var mainFacets = mainSubResponse.facets || {};

  Object.keys(mainFacets).forEach(function (facetKey) {
    var facetValueObject = mainFacets[facetKey];

    var hierarchicalFacet = findMatchingHierarchicalFacetFromAttributeName(
      state.hierarchicalFacets,
      facetKey
    );

    if (hierarchicalFacet) {
      // Place the hierarchicalFacet data at the correct index depending on
      // the attributes order that was defined at the helper initialization
      var facetIndex = hierarchicalFacet.attributes.indexOf(facetKey);
      var idxAttributeName = findIndex(state.hierarchicalFacets, function (f) {
        return f.name === hierarchicalFacet.name;
      });
      self.hierarchicalFacets[idxAttributeName][facetIndex] = {
        attribute: facetKey,
        data: facetValueObject,
        exhaustive: mainSubResponse.exhaustiveFacetsCount,
      };
    } else {
      var isFacetDisjunctive = state.disjunctiveFacets.indexOf(facetKey) !== -1;
      var isFacetConjunctive = state.facets.indexOf(facetKey) !== -1;
      var position;

      if (isFacetDisjunctive) {
        position = disjunctiveFacetsIndices[facetKey];
        self.disjunctiveFacets[position] = {
          name: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount,
        };
        assignFacetStats(
          self.disjunctiveFacets[position],
          mainSubResponse.facets_stats,
          facetKey
        );
      }
      if (isFacetConjunctive) {
        position = facetsIndices[facetKey];
        self.facets[position] = {
          name: facetKey,
          data: facetValueObject,
          exhaustive: mainSubResponse.exhaustiveFacetsCount,
        };
        assignFacetStats(
          self.facets[position],
          mainSubResponse.facets_stats,
          facetKey
        );
      }
    }
  });

  // Make sure we do not keep holes within the hierarchical facets
  this.hierarchicalFacets = compact(this.hierarchicalFacets);

  // aggregate the refined disjunctive facets
  disjunctiveFacets.forEach(function (disjunctiveFacet) {
    var result = results[nextDisjunctiveResult];
    var facets = result && result.facets ? result.facets : {};
    var hierarchicalFacet = state.getHierarchicalFacetByName(disjunctiveFacet);

    // There should be only item in facets.
    Object.keys(facets).forEach(function (dfacet) {
      var facetResults = facets[dfacet];

      var position;

      if (hierarchicalFacet) {
        position = findIndex(state.hierarchicalFacets, function (f) {
          return f.name === hierarchicalFacet.name;
        });
        var attributeIndex = findIndex(
          self.hierarchicalFacets[position],
          function (f) {
            return f.attribute === dfacet;
          }
        );

        // previous refinements and no results so not able to find it
        if (attributeIndex === -1) {
          return;
        }

        self.hierarchicalFacets[position][attributeIndex].data = merge(
          {},
          self.hierarchicalFacets[position][attributeIndex].data,
          facetResults
        );
      } else {
        position = disjunctiveFacetsIndices[dfacet];

        var dataFromMainRequest =
          (mainSubResponse.facets && mainSubResponse.facets[dfacet]) || {};

        self.disjunctiveFacets[position] = {
          name: dfacet,
          data: defaultsPure({}, facetResults, dataFromMainRequest),
          exhaustive: result.exhaustiveFacetsCount,
        };
        assignFacetStats(
          self.disjunctiveFacets[position],
          result.facets_stats,
          dfacet
        );

        if (state.disjunctiveFacetsRefinements[dfacet]) {
          state.disjunctiveFacetsRefinements[dfacet].forEach(function (
            refinementValue
          ) {
            // add the disjunctive refinements if it is no more retrieved
            if (
              !self.disjunctiveFacets[position].data[refinementValue] &&
              state.disjunctiveFacetsRefinements[dfacet].indexOf(
                unescapeFacetValue(refinementValue)
              ) > -1
            ) {
              self.disjunctiveFacets[position].data[refinementValue] = 0;
            }
          });
        }
      }
    });
    nextDisjunctiveResult++;
  });

  // if we have some parent level values for hierarchical facets, merge them
  state.getRefinedHierarchicalFacets().forEach(function (refinedFacet) {
    var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
    var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

    var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
    // if we are already at a root refinement (or no refinement at all), there is no
    // root level values request
    if (
      currentRefinement.length === 0 ||
      currentRefinement[0].split(separator).length < 2
    ) {
      return;
    }

    results.slice(nextDisjunctiveResult).forEach(function (result) {
      var facets = result && result.facets ? result.facets : {};

      Object.keys(facets).forEach(function (dfacet) {
        var facetResults = facets[dfacet];
        var position = findIndex(state.hierarchicalFacets, function (f) {
          return f.name === hierarchicalFacet.name;
        });
        var attributeIndex = findIndex(
          self.hierarchicalFacets[position],
          function (f) {
            return f.attribute === dfacet;
          }
        );

        // previous refinements and no results so not able to find it
        if (attributeIndex === -1) {
          return;
        }

        // when we always get root levels, if the hits refinement is `beers > IPA` (count: 5),
        // then the disjunctive values will be `beers` (count: 100),
        // but we do not want to display
        //   | beers (100)
        //     > IPA (5)
        // We want
        //   | beers (5)
        //     > IPA (5)
        var defaultData = {};

        if (currentRefinement.length > 0) {
          var root = currentRefinement[0].split(separator)[0];
          defaultData[root] =
            self.hierarchicalFacets[position][attributeIndex].data[root];
        }

        self.hierarchicalFacets[position][attributeIndex].data = defaultsPure(
          defaultData,
          facetResults,
          self.hierarchicalFacets[position][attributeIndex].data
        );
      });

      nextDisjunctiveResult++;
    });
  });

  // add the excludes
  Object.keys(state.facetsExcludes).forEach(function (facetName) {
    var excludes = state.facetsExcludes[facetName];
    var position = facetsIndices[facetName];

    self.facets[position] = {
      name: facetName,
      data: mainFacets[facetName],
      exhaustive: mainSubResponse.exhaustiveFacetsCount,
    };
    excludes.forEach(function (facetValue) {
      self.facets[position] = self.facets[position] || { name: facetName };
      self.facets[position].data = self.facets[position].data || {};
      self.facets[position].data[facetValue] = 0;
    });
  });

  /**
   * @type {Array}
   */
  this.hierarchicalFacets = this.hierarchicalFacets.map(
    generateHierarchicalTree(state)
  );

  /**
   * @type {Array}
   */
  this.facets = compact(this.facets);
  /**
   * @type {Array}
   */
  this.disjunctiveFacets = compact(this.disjunctiveFacets);

  this._state = state;
}

/**
 * Get a facet object with its name
 * @deprecated
 * @param {string} name name of the faceted attribute
 * @return {SearchResults.Facet} the facet object
 */
SearchResults.prototype.getFacetByName = function (name) {
  function predicate(facet) {
    return facet.name === name;
  }

  return (
    find(this.facets, predicate) ||
    find(this.disjunctiveFacets, predicate) ||
    find(this.hierarchicalFacets, predicate)
  );
};

/**
 * Get the facet values of a specified attribute from a SearchResults object.
 * @private
 * @param {SearchResults} results the search results to search in
 * @param {string} attribute name of the faceted attribute to search for
 * @return {array|object} facet values. For the hierarchical facets it is an object.
 */
function extractNormalizedFacetValues(results, attribute) {
  function predicate(facet) {
    return facet.name === attribute;
  }

  if (results._state.isConjunctiveFacet(attribute)) {
    var facet = find(results.facets, predicate);
    if (!facet) return [];

    return Object.keys(facet.data).map(function (name) {
      var value = escapeFacetValue(name);
      return {
        name: name,
        escapedValue: value,
        count: facet.data[name],
        isRefined: results._state.isFacetRefined(attribute, value),
        isExcluded: results._state.isExcludeRefined(attribute, name),
      };
    });
  } else if (results._state.isDisjunctiveFacet(attribute)) {
    var disjunctiveFacet = find(results.disjunctiveFacets, predicate);
    if (!disjunctiveFacet) return [];

    return Object.keys(disjunctiveFacet.data).map(function (name) {
      var value = escapeFacetValue(name);
      return {
        name: name,
        escapedValue: value,
        count: disjunctiveFacet.data[name],
        isRefined: results._state.isDisjunctiveFacetRefined(attribute, value),
      };
    });
  } else if (results._state.isHierarchicalFacet(attribute)) {
    var hierarchicalFacetValues = find(results.hierarchicalFacets, predicate);
    if (!hierarchicalFacetValues) return hierarchicalFacetValues;

    var hierarchicalFacet =
      results._state.getHierarchicalFacetByName(attribute);
    var separator =
      results._state._getHierarchicalFacetSeparator(hierarchicalFacet);
    var currentRefinement = unescapeFacetValue(
      results._state.getHierarchicalRefinement(attribute)[0] || ''
    );

    if (currentRefinement.indexOf(hierarchicalFacet.rootPath) === 0) {
      currentRefinement = currentRefinement.replace(
        hierarchicalFacet.rootPath + separator,
        ''
      );
    }

    var currentRefinementSplit = currentRefinement.split(separator);
    currentRefinementSplit.unshift(attribute);

    setIsRefined(hierarchicalFacetValues, currentRefinementSplit, 0);

    return hierarchicalFacetValues;
  }

  return undefined;
}

/**
 * Set the isRefined of a hierarchical facet result based on the current state.
 * @param {SearchResults.HierarchicalFacet} item Hierarchical facet to fix
 * @param {string[]} currentRefinement array of parts of the current hierarchical refinement
 * @param {number} depth recursion depth in the currentRefinement
 * @return {undefined} function mutates the item
 */
function setIsRefined(item, currentRefinement, depth) {
  item.isRefined = item.name === currentRefinement[depth];
  if (item.data) {
    item.data.forEach(function (child) {
      setIsRefined(child, currentRefinement, depth + 1);
    });
  }
}

/**
 * Sort nodes of a hierarchical or disjunctive facet results
 * @private
 * @param {function} sortFn sort function to apply
 * @param {HierarchicalFacet|Array} node node upon which we want to apply the sort
 * @param {string[]} names attribute names
 * @param {number} [level=0] current index in the names array
 * @return {HierarchicalFacet|Array} sorted node
 */
function recSort(sortFn, node, names, level) {
  level = level || 0;

  if (Array.isArray(node)) {
    return sortFn(node, names[level]);
  }

  if (!node.data || node.data.length === 0) {
    return node;
  }

  var children = node.data.map(function (childNode) {
    return recSort(sortFn, childNode, names, level + 1);
  });
  var sortedChildren = sortFn(children, names[level]);
  var newNode = defaultsPure({ data: sortedChildren }, node);
  return newNode;
}

SearchResults.DEFAULT_SORT = ['isRefined:desc', 'count:desc', 'name:asc'];

function vanillaSortFn(order, data) {
  return data.sort(order);
}

/**
 * @typedef FacetOrdering
 * @type {Object}
 * @property {string[]} [order]
 * @property {'count' | 'alpha' | 'hidden'} [sortRemainingBy]
 */

/**
 * Sorts facet arrays via their facet ordering
 * @param {Array} facetValues the values
 * @param {FacetOrdering} facetOrdering the ordering
 * @returns {Array} the sorted facet values
 */
function sortViaFacetOrdering(facetValues, facetOrdering) {
  var orderedFacets = [];
  var remainingFacets = [];

  var order = facetOrdering.order || [];
  /**
   * an object with the keys being the values in order, the values their index:
   * ['one', 'two'] -> { one: 0, two: 1 }
   */
  var reverseOrder = order.reduce(function (acc, name, i) {
    acc[name] = i;
    return acc;
  }, {});

  facetValues.forEach(function (item) {
    // hierarchical facets get sorted using their raw name
    var name = item.path || item.name;
    if (reverseOrder[name] !== undefined) {
      orderedFacets[reverseOrder[name]] = item;
    } else {
      remainingFacets.push(item);
    }
  });

  orderedFacets = orderedFacets.filter(function (facet) {
    return facet;
  });

  var sortRemainingBy = facetOrdering.sortRemainingBy;
  var ordering;
  if (sortRemainingBy === 'hidden') {
    return orderedFacets;
  } else if (sortRemainingBy === 'alpha') {
    ordering = [
      ['path', 'name'],
      ['asc', 'asc'],
    ];
  } else {
    ordering = [['count'], ['desc']];
  }

  return orderedFacets.concat(
    orderBy(remainingFacets, ordering[0], ordering[1])
  );
}

/**
 * @param {SearchResults} results the search results class
 * @param {string} attribute the attribute to retrieve ordering of
 * @returns {FacetOrdering | undefined} the facet ordering
 */
function getFacetOrdering(results, attribute) {
  return (
    results.renderingContent &&
    results.renderingContent.facetOrdering &&
    results.renderingContent.facetOrdering.values &&
    results.renderingContent.facetOrdering.values[attribute]
  );
}

/**
 * Get a the list of values for a given facet attribute. Those values are sorted
 * refinement first, descending count (bigger value on top), and name ascending
 * (alphabetical order). The sort formula can overridden using either string based
 * predicates or a function.
 *
 * This method will return all the values returned by the Algolia engine plus all
 * the values already refined. This means that it can happen that the
 * `maxValuesPerFacet` [configuration](https://www.algolia.com/doc/rest-api/search#param-maxValuesPerFacet)
 * might not be respected if you have facet values that are already refined.
 * @param {string} attribute attribute name
 * @param {object} opts configuration options.
 * @param {boolean} [opts.facetOrdering]
 * Force the use of facetOrdering from the result if a sortBy is present. If
 * sortBy isn't present, facetOrdering will be used automatically.
 * @param {Array.<string> | function} opts.sortBy
 * When using strings, it consists of
 * the name of the [FacetValue](#SearchResults.FacetValue) or the
 * [HierarchicalFacet](#SearchResults.HierarchicalFacet) attributes with the
 * order (`asc` or `desc`). For example to order the value by count, the
 * argument would be `['count:asc']`.
 *
 * If only the attribute name is specified, the ordering defaults to the one
 * specified in the default value for this attribute.
 *
 * When not specified, the order is
 * ascending.  This parameter can also be a function which takes two facet
 * values and should return a number, 0 if equal, 1 if the first argument is
 * bigger or -1 otherwise.
 *
 * The default value for this attribute `['isRefined:desc', 'count:desc', 'name:asc']`
 * @return {FacetValue[]|HierarchicalFacet|undefined} depending on the type of facet of
 * the attribute requested (hierarchical, disjunctive or conjunctive)
 * @example
 * helper.on('result', function(event){
 *   //get values ordered only by name ascending using the string predicate
 *   event.results.getFacetValues('city', {sortBy: ['name:asc']});
 *   //get values  ordered only by count ascending using a function
 *   event.results.getFacetValues('city', {
 *     // this is equivalent to ['count:asc']
 *     sortBy: function(a, b) {
 *       if (a.count === b.count) return 0;
 *       if (a.count > b.count)   return 1;
 *       if (b.count > a.count)   return -1;
 *     }
 *   });
 * });
 */
SearchResults.prototype.getFacetValues = function (attribute, opts) {
  var facetValues = extractNormalizedFacetValues(this, attribute);
  if (!facetValues) {
    return undefined;
  }

  var options = defaultsPure({}, opts, {
    sortBy: SearchResults.DEFAULT_SORT,
    // if no sortBy is given, attempt to sort based on facetOrdering
    // if it is given, we still allow to sort via facet ordering first
    facetOrdering: !(opts && opts.sortBy),
  });

  // eslint-disable-next-line consistent-this
  var results = this;
  var attributes;
  if (Array.isArray(facetValues)) {
    attributes = [attribute];
  } else {
    var config = results._state.getHierarchicalFacetByName(facetValues.name);
    attributes = config.attributes;
  }

  return recSort(
    function (data, facetName) {
      if (options.facetOrdering) {
        var facetOrdering = getFacetOrdering(results, facetName);
        if (facetOrdering) {
          return sortViaFacetOrdering(data, facetOrdering);
        }
      }

      if (Array.isArray(options.sortBy)) {
        var order = formatSort(options.sortBy, SearchResults.DEFAULT_SORT);
        return orderBy(data, order[0], order[1]);
      } else if (typeof options.sortBy === 'function') {
        return vanillaSortFn(options.sortBy, data);
      }
      throw new Error(
        'options.sortBy is optional but if defined it must be ' +
          'either an array of string (predicates) or a sorting function'
      );
    },
    facetValues,
    attributes
  );
};

/**
 * Returns the facet stats if attribute is defined and the facet contains some.
 * Otherwise returns undefined.
 * @param {string} attribute name of the faceted attribute
 * @return {object} The stats of the facet
 */
SearchResults.prototype.getFacetStats = function (attribute) {
  if (this._state.isConjunctiveFacet(attribute)) {
    return getFacetStatsIfAvailable(this.facets, attribute);
  } else if (this._state.isDisjunctiveFacet(attribute)) {
    return getFacetStatsIfAvailable(this.disjunctiveFacets, attribute);
  }

  return undefined;
};

/**
 * @typedef {Object} FacetListItem
 * @property {string} name
 */

/**
 * @param {FacetListItem[]} facetList (has more items, but enough for here)
 * @param {string} facetName The attribute to look for
 * @return {object|undefined} The stats of the facet
 */
function getFacetStatsIfAvailable(facetList, facetName) {
  var data = find(facetList, function (facet) {
    return facet.name === facetName;
  });
  return data && data.stats;
}

/**
 * Returns all refinements for all filters + tags. It also provides
 * additional information: count and exhaustiveness for each filter.
 *
 * See the [refinement type](#Refinement) for an exhaustive view of the available
 * data.
 *
 * Note that for a numeric refinement, results are grouped per operator, this
 * means that it will return responses for operators which are empty.
 *
 * @return {Array.<Refinement>} all the refinements
 */
SearchResults.prototype.getRefinements = function () {
  var state = this._state;
  // eslint-disable-next-line consistent-this
  var results = this;
  var res = [];

  Object.keys(state.facetsRefinements).forEach(function (attributeName) {
    state.facetsRefinements[attributeName].forEach(function (name) {
      res.push(
        getRefinement(state, 'facet', attributeName, name, results.facets)
      );
    });
  });

  Object.keys(state.facetsExcludes).forEach(function (attributeName) {
    state.facetsExcludes[attributeName].forEach(function (name) {
      res.push(
        getRefinement(state, 'exclude', attributeName, name, results.facets)
      );
    });
  });

  Object.keys(state.disjunctiveFacetsRefinements).forEach(function (
    attributeName
  ) {
    state.disjunctiveFacetsRefinements[attributeName].forEach(function (name) {
      res.push(
        getRefinement(
          state,
          'disjunctive',
          attributeName,
          name,
          results.disjunctiveFacets
        )
      );
    });
  });

  Object.keys(state.hierarchicalFacetsRefinements).forEach(function (
    attributeName
  ) {
    state.hierarchicalFacetsRefinements[attributeName].forEach(function (name) {
      res.push(
        getHierarchicalRefinement(
          state,
          attributeName,
          name,
          results.hierarchicalFacets
        )
      );
    });
  });

  Object.keys(state.numericRefinements).forEach(function (attributeName) {
    var operators = state.numericRefinements[attributeName];
    Object.keys(operators).forEach(function (operator) {
      operators[operator].forEach(function (value) {
        res.push({
          type: 'numeric',
          attributeName: attributeName,
          name: value,
          numericValue: value,
          operator: operator,
        });
      });
    });
  });

  state.tagRefinements.forEach(function (name) {
    res.push({ type: 'tag', attributeName: '_tags', name: name });
  });

  return res;
};

/**
 * @typedef {Object} Facet
 * @property {string} name
 * @property {Object} data
 * @property {boolean} exhaustive
 */

/**
 * @param {SearchParameters} state the current state
 * @param {string} type the type of the refinement
 * @param {string} attributeName The attribute of the facet
 * @param {*} name The name of the facet
 * @param {Facet[]} resultsFacets facets from the results
 * @return {Refinement} the refinement
 */
function getRefinement(state, type, attributeName, name, resultsFacets) {
  var facet = find(resultsFacets, function (f) {
    return f.name === attributeName;
  });
  var count = facet && facet.data && facet.data[name] ? facet.data[name] : 0;
  var exhaustive = (facet && facet.exhaustive) || false;

  return {
    type: type,
    attributeName: attributeName,
    name: name,
    count: count,
    exhaustive: exhaustive,
  };
}

/**
 * @param {SearchParameters} state the current state
 * @param {string} attributeName the attribute of the hierarchical facet
 * @param {string} name the name of the facet
 * @param {Facet[]} resultsFacets facets from the results
 * @return {HierarchicalFacet} the hierarchical facet
 */
function getHierarchicalRefinement(state, attributeName, name, resultsFacets) {
  var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
  var separator = state._getHierarchicalFacetSeparator(facetDeclaration);
  var split = name.split(separator);
  var rootFacet = find(resultsFacets, function (facet) {
    return facet.name === attributeName;
  });

  var facet = split.reduce(function (intermediateFacet, part) {
    var newFacet =
      intermediateFacet &&
      find(intermediateFacet.data, function (f) {
        return f.name === part;
      });
    return newFacet !== undefined ? newFacet : intermediateFacet;
  }, rootFacet);

  var count = (facet && facet.count) || 0;
  var exhaustive = (facet && facet.exhaustive) || false;
  var path = (facet && facet.path) || '';

  return {
    type: 'hierarchical',
    attributeName: attributeName,
    name: path,
    count: count,
    exhaustive: exhaustive,
  };
}

module.exports = SearchResults;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/algoliasearch.helper.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/algoliasearch.helper.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EventEmitter = __webpack_require__(/*! @algolia/events */ "./node_modules/@algolia/events/events.js");

var DerivedHelper = __webpack_require__(/*! ./DerivedHelper */ "./node_modules/algoliasearch-helper/src/DerivedHelper/index.js");
var escapeFacetValue = (__webpack_require__(/*! ./functions/escapeFacetValue */ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js").escapeFacetValue);
var inherits = __webpack_require__(/*! ./functions/inherits */ "./node_modules/algoliasearch-helper/src/functions/inherits.js");
var merge = __webpack_require__(/*! ./functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");
var objectHasKeys = __webpack_require__(/*! ./functions/objectHasKeys */ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js");
var omit = __webpack_require__(/*! ./functions/omit */ "./node_modules/algoliasearch-helper/src/functions/omit.js");
var requestBuilder = __webpack_require__(/*! ./requestBuilder */ "./node_modules/algoliasearch-helper/src/requestBuilder.js");
var SearchParameters = __webpack_require__(/*! ./SearchParameters */ "./node_modules/algoliasearch-helper/src/SearchParameters/index.js");
var SearchResults = __webpack_require__(/*! ./SearchResults */ "./node_modules/algoliasearch-helper/src/SearchResults/index.js");
var version = __webpack_require__(/*! ./version */ "./node_modules/algoliasearch-helper/src/version.js");

/**
 * Event triggered when a parameter is set or updated
 * @event AlgoliaSearchHelper#event:change
 * @property {object} event
 * @property {SearchParameters} event.state the current parameters with the latest changes applied
 * @property {SearchResults} event.results the previous results received from Algolia. `null` before the first request
 * @example
 * helper.on('change', function(event) {
 *   console.log('The parameters have changed');
 * });
 */

/**
 * Event triggered when a main search is sent to Algolia
 * @event AlgoliaSearchHelper#event:search
 * @property {object} event
 * @property {SearchParameters} event.state the parameters used for this search
 * @property {SearchResults} event.results the results from the previous search. `null` if it is the first search.
 * @example
 * helper.on('search', function(event) {
 *   console.log('Search sent');
 * });
 */

/**
 * Event triggered when a search using `searchForFacetValues` is sent to Algolia
 * @event AlgoliaSearchHelper#event:searchForFacetValues
 * @property {object} event
 * @property {SearchParameters} event.state the parameters used for this search it is the first search.
 * @property {string} event.facet the facet searched into
 * @property {string} event.query the query used to search in the facets
 * @example
 * helper.on('searchForFacetValues', function(event) {
 *   console.log('searchForFacetValues sent');
 * });
 */

/**
 * Event triggered when a search using `searchOnce` is sent to Algolia
 * @event AlgoliaSearchHelper#event:searchOnce
 * @property {object} event
 * @property {SearchParameters} event.state the parameters used for this search it is the first search.
 * @example
 * helper.on('searchOnce', function(event) {
 *   console.log('searchOnce sent');
 * });
 */

/**
 * Event triggered when the results are retrieved from Algolia
 * @event AlgoliaSearchHelper#event:result
 * @property {object} event
 * @property {SearchResults} event.results the results received from Algolia
 * @property {SearchParameters} event.state the parameters used to query Algolia. Those might be different from the one in the helper instance (for example if the network is unreliable).
 * @example
 * helper.on('result', function(event) {
 *   console.log('Search results received');
 * });
 */

/**
 * Event triggered when Algolia sends back an error. For example, if an unknown parameter is
 * used, the error can be caught using this event.
 * @event AlgoliaSearchHelper#event:error
 * @property {object} event
 * @property {Error} event.error the error returned by the Algolia.
 * @example
 * helper.on('error', function(event) {
 *   console.log('Houston we got a problem.');
 * });
 */

/**
 * Event triggered when the queue of queries have been depleted (with any result or outdated queries)
 * @event AlgoliaSearchHelper#event:searchQueueEmpty
 * @example
 * helper.on('searchQueueEmpty', function() {
 *   console.log('No more search pending');
 *   // This is received before the result event if we're not expecting new results
 * });
 *
 * helper.search();
 */

/**
 * Initialize a new AlgoliaSearchHelper
 * @class
 * @classdesc The AlgoliaSearchHelper is a class that ease the management of the
 * search. It provides an event based interface for search callbacks:
 *  - change: when the internal search state is changed.
 *    This event contains a {@link SearchParameters} object and the
 *    {@link SearchResults} of the last result if any.
 *  - search: when a search is triggered using the `search()` method.
 *  - result: when the response is retrieved from Algolia and is processed.
 *    This event contains a {@link SearchResults} object and the
 *    {@link SearchParameters} corresponding to this answer.
 *  - error: when the response is an error. This event contains the error returned by the server.
 * @param  {AlgoliaSearch} client an AlgoliaSearch client
 * @param  {string} index the index name to query
 * @param  {SearchParameters | object} options an object defining the initial
 * config of the search. It doesn't have to be a {SearchParameters},
 * just an object containing the properties you need from it.
 */
function AlgoliaSearchHelper(client, index, options) {
  if (typeof client.addAlgoliaAgent === 'function') {
    client.addAlgoliaAgent('JS Helper (' + version + ')');
  }

  this.setClient(client);
  var opts = options || {};
  opts.index = index;
  this.state = SearchParameters.make(opts);
  this.lastResults = null;
  this._queryId = 0;
  this._lastQueryIdReceived = -1;
  this.derivedHelpers = [];
  this._currentNbQueries = 0;
}

inherits(AlgoliaSearchHelper, EventEmitter);

/**
 * Start the search with the parameters set in the state. When the
 * method is called, it triggers a `search` event. The results will
 * be available through the `result` event. If an error occurs, an
 * `error` will be fired instead.
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires search
 * @fires result
 * @fires error
 * @chainable
 */
AlgoliaSearchHelper.prototype.search = function () {
  this._search({ onlyWithDerivedHelpers: false });
  return this;
};

AlgoliaSearchHelper.prototype.searchOnlyWithDerivedHelpers = function () {
  this._search({ onlyWithDerivedHelpers: true });
  return this;
};

/**
 * Gets the search query parameters that would be sent to the Algolia Client
 * for the hits
 * @return {object} Query Parameters
 */
AlgoliaSearchHelper.prototype.getQuery = function () {
  var state = this.state;
  return requestBuilder._getHitsSearchParams(state);
};

/**
 * Start a search using a modified version of the current state. This method does
 * not trigger the helper lifecycle and does not modify the state kept internally
 * by the helper. This second aspect means that the next search call will be the
 * same as a search call before calling searchOnce.
 * @param {object} options can contain all the parameters that can be set to SearchParameters
 * plus the index
 * @param {function} [cb] optional callback executed when the response from the
 * server is back.
 * @return {promise|undefined} if a callback is passed the method returns undefined
 * otherwise it returns a promise containing an object with two keys :
 *  - content with a SearchResults
 *  - state with the state used for the query as a SearchParameters
 * @example
 * // Changing the number of records returned per page to 1
 * // This example uses the callback API
 * var state = helper.searchOnce({hitsPerPage: 1},
 *   function(error, content, state) {
 *     // if an error occurred it will be passed in error, otherwise its value is null
 *     // content contains the results formatted as a SearchResults
 *     // state is the instance of SearchParameters used for this search
 *   });
 * @example
 * // Changing the number of records returned per page to 1
 * // This example uses the promise API
 * var state1 = helper.searchOnce({hitsPerPage: 1})
 *                 .then(promiseHandler);
 *
 * function promiseHandler(res) {
 *   // res contains
 *   // {
 *   //   content : SearchResults
 *   //   state   : SearchParameters (the one used for this specific search)
 *   // }
 * }
 */
AlgoliaSearchHelper.prototype.searchOnce = function (options, cb) {
  var tempState = !options
    ? this.state
    : this.state.setQueryParameters(options);
  var queries = requestBuilder._getQueries(tempState.index, tempState);
  // eslint-disable-next-line consistent-this
  var self = this;

  this._currentNbQueries++;

  this.emit('searchOnce', {
    state: tempState,
  });

  if (cb) {
    this.client
      .search(queries)
      .then(function (content) {
        self._currentNbQueries--;
        if (self._currentNbQueries === 0) {
          self.emit('searchQueueEmpty');
        }

        cb(null, new SearchResults(tempState, content.results), tempState);
      })
      .catch(function (err) {
        self._currentNbQueries--;
        if (self._currentNbQueries === 0) {
          self.emit('searchQueueEmpty');
        }

        cb(err, null, tempState);
      });

    return undefined;
  }

  return this.client.search(queries).then(
    function (content) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      return {
        content: new SearchResults(tempState, content.results),
        state: tempState,
        _originalResponse: content,
      };
    },
    function (e) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      throw e;
    }
  );
};

/**
 * Start the search for answers with the parameters set in the state.
 * This method returns a promise.
 * @param {Object} options - the options for answers API call
 * @param {string[]} options.attributesForPrediction - Attributes to use for predictions. If empty, `searchableAttributes` is used instead.
 * @param {string[]} options.queryLanguages - The languages in the query. Currently only supports ['en'].
 * @param {number} options.nbHits - Maximum number of answers to retrieve from the Answers Engine. Cannot be greater than 1000.
 *
 * @return {promise} the answer results
 * @deprecated answers is deprecated and will be replaced with new initiatives
 */
AlgoliaSearchHelper.prototype.findAnswers = function (options) {
  // eslint-disable-next-line no-console
  console.warn('[algoliasearch-helper] answers is no longer supported');
  var state = this.state;
  var derivedHelper = this.derivedHelpers[0];
  if (!derivedHelper) {
    return Promise.resolve([]);
  }
  var derivedState = derivedHelper.getModifiedState(state);
  var data = merge(
    {
      attributesForPrediction: options.attributesForPrediction,
      nbHits: options.nbHits,
    },
    {
      params: omit(requestBuilder._getHitsSearchParams(derivedState), [
        'attributesToSnippet',
        'hitsPerPage',
        'restrictSearchableAttributes',
        'snippetEllipsisText',
      ]),
    }
  );

  var errorMessage =
    'search for answers was called, but this client does not have a function client.initIndex(index).findAnswers';
  if (typeof this.client.initIndex !== 'function') {
    throw new Error(errorMessage);
  }
  var index = this.client.initIndex(derivedState.index);
  if (typeof index.findAnswers !== 'function') {
    throw new Error(errorMessage);
  }
  return index.findAnswers(derivedState.query, options.queryLanguages, data);
};

/**
 * Structure of each result when using
 * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
 * @typedef FacetSearchHit
 * @type {object}
 * @property {string} value the facet value
 * @property {string} highlighted the facet value highlighted with the query string
 * @property {number} count number of occurrence of this facet value
 * @property {boolean} isRefined true if the value is already refined
 */

/**
 * Structure of the data resolved by the
 * [`searchForFacetValues()`](reference.html#AlgoliaSearchHelper#searchForFacetValues)
 * promise.
 * @typedef FacetSearchResult
 * @type {object}
 * @property {FacetSearchHit} facetHits the results for this search for facet values
 * @property {number} processingTimeMS time taken by the query inside the engine
 */

/**
 * Search for facet values based on an query and the name of a faceted attribute. This
 * triggers a search and will return a promise. On top of using the query, it also sends
 * the parameters from the state so that the search is narrowed down to only the possible values.
 *
 * See the description of [FacetSearchResult](reference.html#FacetSearchResult)
 * @param {string} facet the name of the faceted attribute
 * @param {string} query the string query for the search
 * @param {number} [maxFacetHits] the maximum number values returned. Should be > 0 and <= 100
 * @param {object} [userState] the set of custom parameters to use on top of the current state. Setting a property to `undefined` removes
 * it in the generated query.
 * @return {promise.<FacetSearchResult>} the results of the search
 */
AlgoliaSearchHelper.prototype.searchForFacetValues = function (
  facet,
  query,
  maxFacetHits,
  userState
) {
  var clientHasSFFV = typeof this.client.searchForFacetValues === 'function';
  var clientHasInitIndex = typeof this.client.initIndex === 'function';
  if (
    !clientHasSFFV &&
    !clientHasInitIndex &&
    typeof this.client.search !== 'function'
  ) {
    throw new Error(
      'search for facet values (searchable) was called, but this client does not have a function client.searchForFacetValues or client.initIndex(index).searchForFacetValues'
    );
  }

  var state = this.state.setQueryParameters(userState || {});
  var isDisjunctive = state.isDisjunctiveFacet(facet);
  var algoliaQuery = requestBuilder.getSearchForFacetQuery(
    facet,
    query,
    maxFacetHits,
    state
  );

  this._currentNbQueries++;
  // eslint-disable-next-line consistent-this
  var self = this;
  var searchForFacetValuesPromise;
  // newer algoliasearch ^3.27.1 - ~4.0.0
  if (clientHasSFFV) {
    searchForFacetValuesPromise = this.client.searchForFacetValues([
      { indexName: state.index, params: algoliaQuery },
    ]);
    // algoliasearch < 3.27.1
  } else if (clientHasInitIndex) {
    searchForFacetValuesPromise = this.client
      .initIndex(state.index)
      .searchForFacetValues(algoliaQuery);
    // algoliasearch ~5.0.0
  } else {
    // @MAJOR only use client.search
    delete algoliaQuery.facetName;
    searchForFacetValuesPromise = this.client
      .search([
        {
          type: 'facet',
          facet: facet,
          indexName: state.index,
          params: algoliaQuery,
        },
      ])
      .then(function processResponse(response) {
        return response.results[0];
      });
  }

  this.emit('searchForFacetValues', {
    state: state,
    facet: facet,
    query: query,
  });

  return searchForFacetValuesPromise.then(
    function addIsRefined(content) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');

      content = Array.isArray(content) ? content[0] : content;

      content.facetHits.forEach(function (f) {
        f.escapedValue = escapeFacetValue(f.value);
        f.isRefined = isDisjunctive
          ? state.isDisjunctiveFacetRefined(facet, f.escapedValue)
          : state.isFacetRefined(facet, f.escapedValue);
      });

      return content;
    },
    function (e) {
      self._currentNbQueries--;
      if (self._currentNbQueries === 0) self.emit('searchQueueEmpty');
      throw e;
    }
  );
};

/**
 * Sets the text query used for the search.
 *
 * This method resets the current page to 0.
 * @param  {string} q the user query
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setQuery = function (q) {
  this._change({
    state: this.state.resetPage().setQuery(q),
    isPageReset: true,
  });

  return this;
};

/**
 * Remove all the types of refinements except tags. A string can be provided to remove
 * only the refinements of a specific attribute. For more advanced use case, you can
 * provide a function instead. This function should follow the
 * [clearCallback definition](#SearchParameters.clearCallback).
 *
 * This method resets the current page to 0.
 * @param {string} [name] optional name of the facet / attribute on which we want to remove all refinements
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 * @example
 * // Removing all the refinements
 * helper.clearRefinements().search();
 * @example
 * // Removing all the filters on a the category attribute.
 * helper.clearRefinements('category').search();
 * @example
 * // Removing only the exclude filters on the category facet.
 * helper.clearRefinements(function(value, attribute, type) {
 *   return type === 'exclude' && attribute === 'category';
 * }).search();
 */
AlgoliaSearchHelper.prototype.clearRefinements = function (name) {
  this._change({
    state: this.state.resetPage().clearRefinements(name),
    isPageReset: true,
  });

  return this;
};

/**
 * Remove all the tag filters.
 *
 * This method resets the current page to 0.
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.clearTags = function () {
  this._change({
    state: this.state.resetPage().clearTags(),
    isPageReset: true,
  });

  return this;
};

/**
 * Adds a disjunctive filter to a faceted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addDisjunctiveFacetRefinement = function (
  facet,
  value
) {
  this._change({
    state: this.state.resetPage().addDisjunctiveFacetRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addDisjunctiveFacetRefinement}
 */
AlgoliaSearchHelper.prototype.addDisjunctiveRefine = function () {
  return this.addDisjunctiveFacetRefinement.apply(this, arguments);
};

/**
 * Adds a refinement on a hierarchical facet. It will throw
 * an exception if the facet is not defined or if the facet
 * is already refined.
 *
 * This method resets the current page to 0.
 * @param {string} facet the facet name
 * @param {string} path the hierarchical facet path
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @throws Error if the facet is not defined or if the facet is refined
 * @chainable
 * @fires change
 */
AlgoliaSearchHelper.prototype.addHierarchicalFacetRefinement = function (
  facet,
  path
) {
  this._change({
    state: this.state.resetPage().addHierarchicalFacetRefinement(facet, path),
    isPageReset: true,
  });

  return this;
};

/**
 * Adds a an numeric filter to an attribute with the `operator` and `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} operator the operator of the filter
 * @param  {number} value the value of the filter
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addNumericRefinement = function (
  attribute,
  operator,
  value
) {
  this._change({
    state: this.state
      .resetPage()
      .addNumericRefinement(attribute, operator, value),
    isPageReset: true,
  });

  return this;
};

/**
 * Adds a filter to a faceted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addFacetRefinement = function (facet, value) {
  this._change({
    state: this.state.resetPage().addFacetRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetRefinement}
 */
AlgoliaSearchHelper.prototype.addRefine = function () {
  return this.addFacetRefinement.apply(this, arguments);
};

/**
 * Adds a an exclusion filter to a faceted attribute with the `value` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value (will be converted to string)
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addFacetExclusion = function (facet, value) {
  this._change({
    state: this.state.resetPage().addExcludeRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#addFacetExclusion}
 */
AlgoliaSearchHelper.prototype.addExclude = function () {
  return this.addFacetExclusion.apply(this, arguments);
};

/**
 * Adds a tag filter with the `tag` provided. If the
 * filter is already set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param {string} tag the tag to add to the filter
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.addTag = function (tag) {
  this._change({
    state: this.state.resetPage().addTagRefinement(tag),
    isPageReset: true,
  });

  return this;
};

/**
 * Removes an numeric filter to an attribute with the `operator` and `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * Some parameters are optional, triggering different behavior:
 *  - if the value is not provided, then all the numeric value will be removed for the
 *  specified attribute/operator couple.
 *  - if the operator is not provided either, then all the numeric filter on this attribute
 *  will be removed.
 *
 * This method resets the current page to 0.
 * @param  {string} attribute the attribute on which the numeric filter applies
 * @param  {string} [operator] the operator of the filter
 * @param  {number} [value] the value of the filter
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeNumericRefinement = function (
  attribute,
  operator,
  value
) {
  this._change({
    state: this.state
      .resetPage()
      .removeNumericRefinement(attribute, operator, value),
    isPageReset: true,
  });

  return this;
};

/**
 * Removes a disjunctive filter to a faceted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeDisjunctiveFacetRefinement = function (
  facet,
  value
) {
  this._change({
    state: this.state
      .resetPage()
      .removeDisjunctiveFacetRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeDisjunctiveFacetRefinement}
 */
AlgoliaSearchHelper.prototype.removeDisjunctiveRefine = function () {
  return this.removeDisjunctiveFacetRefinement.apply(this, arguments);
};

/**
 * Removes the refinement set on a hierarchical facet.
 * @param {string} facet the facet name
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @throws Error if the facet is not defined or if the facet is not refined
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeHierarchicalFacetRefinement = function (
  facet
) {
  this._change({
    state: this.state.resetPage().removeHierarchicalFacetRefinement(facet),
    isPageReset: true,
  });

  return this;
};

/**
 * Removes a filter to a faceted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeFacetRefinement = function (facet, value) {
  this._change({
    state: this.state.resetPage().removeFacetRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetRefinement}
 */
AlgoliaSearchHelper.prototype.removeRefine = function () {
  return this.removeFacetRefinement.apply(this, arguments);
};

/**
 * Removes an exclusion filter to a faceted attribute with the `value` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * If the value is omitted, then this method will remove all the filters for the
 * attribute.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} [value] the associated value
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeFacetExclusion = function (facet, value) {
  this._change({
    state: this.state.resetPage().removeExcludeRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#removeFacetExclusion}
 */
AlgoliaSearchHelper.prototype.removeExclude = function () {
  return this.removeFacetExclusion.apply(this, arguments);
};

/**
 * Removes a tag filter with the `tag` provided. If the
 * filter is not set, it doesn't change the filters.
 *
 * This method resets the current page to 0.
 * @param {string} tag tag to remove from the filter
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.removeTag = function (tag) {
  this._change({
    state: this.state.resetPage().removeTagRefinement(tag),
    isPageReset: true,
  });

  return this;
};

/**
 * Adds or removes an exclusion filter to a faceted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleFacetExclusion = function (facet, value) {
  this._change({
    state: this.state.resetPage().toggleExcludeFacetRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetExclusion}
 */
AlgoliaSearchHelper.prototype.toggleExclude = function () {
  return this.toggleFacetExclusion.apply(this, arguments);
};

/**
 * Adds or removes a filter to a faceted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method can be used for conjunctive, disjunctive and hierarchical filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @throws Error will throw an error if the facet is not declared in the settings of the helper
 * @fires change
 * @chainable
 * @deprecated since version 2.19.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
 */
AlgoliaSearchHelper.prototype.toggleRefinement = function (facet, value) {
  return this.toggleFacetRefinement(facet, value);
};

/**
 * Adds or removes a filter to a faceted attribute with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method can be used for conjunctive, disjunctive and hierarchical filters.
 *
 * This method resets the current page to 0.
 * @param  {string} facet the facet to refine
 * @param  {string} value the associated value
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @throws Error will throw an error if the facet is not declared in the settings of the helper
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleFacetRefinement = function (facet, value) {
  this._change({
    state: this.state.resetPage().toggleFacetRefinement(facet, value),
    isPageReset: true,
  });

  return this;
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since version 2.4.0, see {@link AlgoliaSearchHelper#toggleFacetRefinement}
 */
AlgoliaSearchHelper.prototype.toggleRefine = function () {
  return this.toggleFacetRefinement.apply(this, arguments);
};

/**
 * Adds or removes a tag filter with the `value` provided. If
 * the value is set then it removes it, otherwise it adds the filter.
 *
 * This method resets the current page to 0.
 * @param {string} tag tag to remove or add
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.toggleTag = function (tag) {
  this._change({
    state: this.state.resetPage().toggleTagRefinement(tag),
    isPageReset: true,
  });

  return this;
};

/**
 * Increments the page number by one.
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 * @example
 * helper.setPage(0).nextPage().getPage();
 * // returns 1
 */
AlgoliaSearchHelper.prototype.nextPage = function () {
  var page = this.state.page || 0;
  return this.setPage(page + 1);
};

/**
 * Decrements the page number by one.
 * @fires change
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @chainable
 * @example
 * helper.setPage(1).previousPage().getPage();
 * // returns 0
 */
AlgoliaSearchHelper.prototype.previousPage = function () {
  var page = this.state.page || 0;
  return this.setPage(page - 1);
};

/**
 * @private
 * @param {number} page The page number
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @chainable
 * @fires change
 */
function setCurrentPage(page) {
  if (page < 0) throw new Error('Page requested below 0.');

  this._change({
    state: this.state.setPage(page),
    isPageReset: false,
  });

  return this;
}

/**
 * Change the current page
 * @deprecated
 * @param  {number} page The page number
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setCurrentPage = setCurrentPage;

/**
 * Updates the current page.
 * @function
 * @param  {number} page The page number
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setPage = setCurrentPage;

/**
 * Updates the name of the index that will be targeted by the query.
 *
 * This method resets the current page to 0.
 * @param {string} name the index name
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setIndex = function (name) {
  this._change({
    state: this.state.resetPage().setIndex(name),
    isPageReset: true,
  });

  return this;
};

/**
 * Update a parameter of the search. This method reset the page
 *
 * The complete list of parameters is available on the
 * [Algolia website](https://www.algolia.com/doc/rest#query-an-index).
 * The most commonly used parameters have their own [shortcuts](#query-parameters-shortcuts)
 * or benefit from higher-level APIs (all the kind of filters and facets have their own API)
 *
 * This method resets the current page to 0.
 * @param {string} parameter name of the parameter to update
 * @param {any} value new value of the parameter
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 * @example
 * helper.setQueryParameter('hitsPerPage', 20).search();
 */
AlgoliaSearchHelper.prototype.setQueryParameter = function (parameter, value) {
  this._change({
    state: this.state.resetPage().setQueryParameter(parameter, value),
    isPageReset: true,
  });

  return this;
};

/**
 * Set the whole state (warning: will erase previous state)
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @fires change
 * @chainable
 */
AlgoliaSearchHelper.prototype.setState = function (newState) {
  this._change({
    state: SearchParameters.make(newState),
    isPageReset: false,
  });

  return this;
};

/**
 * Override the current state without triggering a change event.
 * Do not use this method unless you know what you are doing. (see the example
 * for a legit use case)
 * @param {SearchParameters} newState the whole new state
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 * @example
 *  helper.on('change', function(state){
 *    // In this function you might want to find a way to store the state in the url/history
 *    updateYourURL(state)
 *  })
 *  window.onpopstate = function(event){
 *    // This is naive though as you should check if the state is really defined etc.
 *    helper.overrideStateWithoutTriggeringChangeEvent(event.state).search()
 *  }
 * @chainable
 */
AlgoliaSearchHelper.prototype.overrideStateWithoutTriggeringChangeEvent =
  function (newState) {
    this.state = new SearchParameters(newState);
    return this;
  };

/**
 * Check if an attribute has any numeric, conjunctive, disjunctive or hierarchical filters.
 * @param {string} attribute the name of the attribute
 * @return {boolean} true if the attribute is filtered by at least one value
 * @example
 * // hasRefinements works with numeric, conjunctive, disjunctive and hierarchical filters
 * helper.hasRefinements('price'); // false
 * helper.addNumericRefinement('price', '>', 100);
 * helper.hasRefinements('price'); // true
 *
 * helper.hasRefinements('color'); // false
 * helper.addFacetRefinement('color', 'blue');
 * helper.hasRefinements('color'); // true
 *
 * helper.hasRefinements('material'); // false
 * helper.addDisjunctiveFacetRefinement('material', 'plastic');
 * helper.hasRefinements('material'); // true
 *
 * helper.hasRefinements('categories'); // false
 * helper.toggleFacetRefinement('categories', 'kitchen > knife');
 * helper.hasRefinements('categories'); // true
 *
 */
AlgoliaSearchHelper.prototype.hasRefinements = function (attribute) {
  if (objectHasKeys(this.state.getNumericRefinements(attribute))) {
    return true;
  } else if (this.state.isConjunctiveFacet(attribute)) {
    return this.state.isFacetRefined(attribute);
  } else if (this.state.isDisjunctiveFacet(attribute)) {
    return this.state.isDisjunctiveFacetRefined(attribute);
  } else if (this.state.isHierarchicalFacet(attribute)) {
    return this.state.isHierarchicalFacetRefined(attribute);
  }

  // there's currently no way to know that the user did call `addNumericRefinement` at some point
  // thus we cannot distinguish if there once was a numeric refinement that was cleared
  // so we will return false in every other situations to be consistent
  // while what we should do here is throw because we did not find the attribute in any type
  // of refinement
  return false;
};

/**
 * Check if a value is excluded for a specific faceted attribute. If the value
 * is omitted then the function checks if there is any excluding refinements.
 *
 * @param  {string}  facet name of the attribute for used for faceting
 * @param  {string}  [value] optional value. If passed will test that this value
 * is filtering the given facet.
 * @return {boolean} true if refined
 * @example
 * helper.isExcludeRefined('color'); // false
 * helper.isExcludeRefined('color', 'blue') // false
 * helper.isExcludeRefined('color', 'red') // false
 *
 * helper.addFacetExclusion('color', 'red');
 *
 * helper.isExcludeRefined('color'); // true
 * helper.isExcludeRefined('color', 'blue') // false
 * helper.isExcludeRefined('color', 'red') // true
 */
AlgoliaSearchHelper.prototype.isExcluded = function (facet, value) {
  return this.state.isExcludeRefined(facet, value);
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasRefinements}
 */
AlgoliaSearchHelper.prototype.isDisjunctiveRefined = function (facet, value) {
  return this.state.isDisjunctiveFacetRefined(facet, value);
};

/**
 * Check if the string is a currently filtering tag.
 * @param {string} tag tag to check
 * @return {boolean} true if the tag is currently refined
 */
AlgoliaSearchHelper.prototype.hasTag = function (tag) {
  return this.state.isTagRefined(tag);
};

// eslint-disable-next-line valid-jsdoc
/**
 * @deprecated since 2.4.0, see {@link AlgoliaSearchHelper#hasTag}
 */
AlgoliaSearchHelper.prototype.isTagRefined = function () {
  return this.hasTagRefinements.apply(this, arguments);
};

/**
 * Get the name of the currently used index.
 * @return {string} name of the index
 * @example
 * helper.setIndex('highestPrice_products').getIndex();
 * // returns 'highestPrice_products'
 */
AlgoliaSearchHelper.prototype.getIndex = function () {
  return this.state.index;
};

function getCurrentPage() {
  return this.state.page;
}

/**
 * Get the currently selected page
 * @deprecated
 * @return {number} the current page
 */
AlgoliaSearchHelper.prototype.getCurrentPage = getCurrentPage;
/**
 * Get the currently selected page
 * @function
 * @return {number} the current page
 */
AlgoliaSearchHelper.prototype.getPage = getCurrentPage;

/**
 * Get all the tags currently set to filters the results.
 *
 * @return {string[]} The list of tags currently set.
 */
AlgoliaSearchHelper.prototype.getTags = function () {
  return this.state.tagRefinements;
};

/**
 * Get the list of refinements for a given attribute. This method works with
 * conjunctive, disjunctive, excluding and numerical filters.
 *
 * See also SearchResults#getRefinements
 *
 * @param {string} facetName attribute name used for faceting
 * @return {Array.<FacetRefinement|NumericRefinement>} All Refinement are objects that contain a value, and
 * a type. Numeric also contains an operator.
 * @example
 * helper.addNumericRefinement('price', '>', 100);
 * helper.getRefinements('price');
 * // [
 * //   {
 * //     "value": [
 * //       100
 * //     ],
 * //     "operator": ">",
 * //     "type": "numeric"
 * //   }
 * // ]
 * @example
 * helper.addFacetRefinement('color', 'blue');
 * helper.addFacetExclusion('color', 'red');
 * helper.getRefinements('color');
 * // [
 * //   {
 * //     "value": "blue",
 * //     "type": "conjunctive"
 * //   },
 * //   {
 * //     "value": "red",
 * //     "type": "exclude"
 * //   }
 * // ]
 * @example
 * helper.addDisjunctiveFacetRefinement('material', 'plastic');
 * // [
 * //   {
 * //     "value": "plastic",
 * //     "type": "disjunctive"
 * //   }
 * // ]
 */
AlgoliaSearchHelper.prototype.getRefinements = function (facetName) {
  var refinements = [];

  if (this.state.isConjunctiveFacet(facetName)) {
    var conjRefinements = this.state.getConjunctiveRefinements(facetName);

    conjRefinements.forEach(function (r) {
      refinements.push({
        value: r,
        type: 'conjunctive',
      });
    });

    var excludeRefinements = this.state.getExcludeRefinements(facetName);

    excludeRefinements.forEach(function (r) {
      refinements.push({
        value: r,
        type: 'exclude',
      });
    });
  } else if (this.state.isDisjunctiveFacet(facetName)) {
    var disjunctiveRefinements =
      this.state.getDisjunctiveRefinements(facetName);

    disjunctiveRefinements.forEach(function (r) {
      refinements.push({
        value: r,
        type: 'disjunctive',
      });
    });
  }

  var numericRefinements = this.state.getNumericRefinements(facetName);

  Object.keys(numericRefinements).forEach(function (operator) {
    var value = numericRefinements[operator];

    refinements.push({
      value: value,
      operator: operator,
      type: 'numeric',
    });
  });

  return refinements;
};

/**
 * Return the current refinement for the (attribute, operator)
 * @param {string} attribute attribute in the record
 * @param {string} operator operator applied on the refined values
 * @return {Array.<number|number[]>} refined values
 */
AlgoliaSearchHelper.prototype.getNumericRefinement = function (
  attribute,
  operator
) {
  return this.state.getNumericRefinement(attribute, operator);
};

/**
 * Get the current breadcrumb for a hierarchical facet, as an array
 * @param  {string} facetName Hierarchical facet name
 * @return {array.<string>} the path as an array of string
 */
AlgoliaSearchHelper.prototype.getHierarchicalFacetBreadcrumb = function (
  facetName
) {
  return this.state.getHierarchicalFacetBreadcrumb(facetName);
};

// /////////// PRIVATE

/**
 * Perform the underlying queries
 * @private
 * @param {object} options options for the query
 * @param {boolean} [options.onlyWithDerivedHelpers=false] if true, only the derived helpers will be queried
 * @return {undefined} does not return anything
 * @fires search
 * @fires result
 * @fires error
 */
AlgoliaSearchHelper.prototype._search = function (options) {
  var state = this.state;
  var states = [];
  var mainQueries = [];

  if (!options.onlyWithDerivedHelpers) {
    mainQueries = requestBuilder._getQueries(state.index, state);

    states.push({
      state: state,
      queriesCount: mainQueries.length,
      helper: this,
    });

    this.emit('search', {
      state: state,
      results: this.lastResults,
    });
  }

  var derivedQueries = this.derivedHelpers.map(function (derivedHelper) {
    var derivedState = derivedHelper.getModifiedState(state);
    var derivedStateQueries = derivedState.index
      ? requestBuilder._getQueries(derivedState.index, derivedState)
      : [];

    states.push({
      state: derivedState,
      queriesCount: derivedStateQueries.length,
      helper: derivedHelper,
    });

    derivedHelper.emit('search', {
      state: derivedState,
      results: derivedHelper.lastResults,
    });

    return derivedStateQueries;
  });

  var queries = Array.prototype.concat.apply(mainQueries, derivedQueries);

  var queryId = this._queryId++;
  this._currentNbQueries++;

  if (!queries.length) {
    return Promise.resolve({ results: [] }).then(
      this._dispatchAlgoliaResponse.bind(this, states, queryId)
    );
  }

  try {
    this.client
      .search(queries)
      .then(this._dispatchAlgoliaResponse.bind(this, states, queryId))
      .catch(this._dispatchAlgoliaError.bind(this, queryId));
  } catch (error) {
    // If we reach this part, we're in an internal error state
    this.emit('error', {
      error: error,
    });
  }

  return undefined;
};

/**
 * Transform the responses as sent by the server and transform them into a user
 * usable object that merge the results of all the batch requests. It will dispatch
 * over the different helper + derived helpers (when there are some).
 * @private
 * @param {array.<{SearchParameters, AlgoliaQueries, AlgoliaSearchHelper}>} states state used to generate the request
 * @param {number} queryId id of the current request
 * @param {object} content content of the response
 * @return {undefined}
 */
AlgoliaSearchHelper.prototype._dispatchAlgoliaResponse = function (
  states,
  queryId,
  content
) {
  // @TODO remove the number of outdated queries discarded instead of just one

  if (queryId < this._lastQueryIdReceived) {
    // Outdated answer
    return;
  }

  this._currentNbQueries -= queryId - this._lastQueryIdReceived;
  this._lastQueryIdReceived = queryId;

  if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');

  var results = content.results.slice();

  states.forEach(function (s) {
    var state = s.state;
    var queriesCount = s.queriesCount;
    var helper = s.helper;
    var specificResults = results.splice(0, queriesCount);

    if (!state.index) {
      helper.emit('result', {
        results: null,
        state: state,
      });
      return;
    }

    helper.lastResults = new SearchResults(state, specificResults);

    helper.emit('result', {
      results: helper.lastResults,
      state: state,
    });
  });
};

AlgoliaSearchHelper.prototype._dispatchAlgoliaError = function (
  queryId,
  error
) {
  if (queryId < this._lastQueryIdReceived) {
    // Outdated answer
    return;
  }

  this._currentNbQueries -= queryId - this._lastQueryIdReceived;
  this._lastQueryIdReceived = queryId;

  this.emit('error', {
    error: error,
  });

  if (this._currentNbQueries === 0) this.emit('searchQueueEmpty');
};

AlgoliaSearchHelper.prototype.containsRefinement = function (
  query,
  facetFilters,
  numericFilters,
  tagFilters
) {
  return (
    query ||
    facetFilters.length !== 0 ||
    numericFilters.length !== 0 ||
    tagFilters.length !== 0
  );
};

/**
 * Test if there are some disjunctive refinements on the facet
 * @private
 * @param {string} facet the attribute to test
 * @return {boolean} true if there are refinements on this attribute
 */
AlgoliaSearchHelper.prototype._hasDisjunctiveRefinements = function (facet) {
  return (
    this.state.disjunctiveRefinements[facet] &&
    this.state.disjunctiveRefinements[facet].length > 0
  );
};

AlgoliaSearchHelper.prototype._change = function (event) {
  var state = event.state;
  var isPageReset = event.isPageReset;

  if (state !== this.state) {
    this.state = state;

    this.emit('change', {
      state: this.state,
      results: this.lastResults,
      isPageReset: isPageReset,
    });
  }
};

/**
 * Clears the cache of the underlying Algolia client.
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 */
AlgoliaSearchHelper.prototype.clearCache = function () {
  if (this.client.clearCache) this.client.clearCache();
  return this;
};

/**
 * Updates the internal client instance. If the reference of the clients
 * are equal then no update is actually done.
 * @param  {AlgoliaSearch} newClient an AlgoliaSearch client
 * @return {AlgoliaSearchHelper} Method is chainable, it returns itself
 */
AlgoliaSearchHelper.prototype.setClient = function (newClient) {
  if (this.client === newClient) return this;

  if (typeof newClient.addAlgoliaAgent === 'function') {
    newClient.addAlgoliaAgent('JS Helper (' + version + ')');
  }
  this.client = newClient;

  return this;
};

/**
 * Gets the instance of the currently used client.
 * @return {AlgoliaSearch} the currently used client
 */
AlgoliaSearchHelper.prototype.getClient = function () {
  return this.client;
};

/**
 * Creates an derived instance of the Helper. A derived helper
 * is a way to request other indices synchronised with the lifecycle
 * of the main Helper. This mechanism uses the multiqueries feature
 * of Algolia to aggregate all the requests in a single network call.
 *
 * This method takes a function that is used to create a new SearchParameter
 * that will be used to create requests to Algolia. Those new requests
 * are created just before the `search` event. The signature of the function
 * is `SearchParameters -> SearchParameters`.
 *
 * This method returns a new DerivedHelper which is an EventEmitter
 * that fires the same `search`, `result` and `error` events. Those
 * events, however, will receive data specific to this DerivedHelper
 * and the SearchParameters that is returned by the call of the
 * parameter function.
 * @param {function} fn SearchParameters -> SearchParameters
 * @return {DerivedHelper} a new DerivedHelper
 */
AlgoliaSearchHelper.prototype.derive = function (fn) {
  var derivedHelper = new DerivedHelper(this, fn);
  this.derivedHelpers.push(derivedHelper);
  return derivedHelper;
};

/**
 * This method detaches a derived Helper from the main one. Prefer using the one from the
 * derived helper itself, to remove the event listeners too.
 * @private
 * @param  {DerivedHelper} derivedHelper the derived helper to detach
 * @return {undefined} nothing is returned
 * @throws Error
 */
AlgoliaSearchHelper.prototype.detachDerivedHelper = function (derivedHelper) {
  var pos = this.derivedHelpers.indexOf(derivedHelper);
  if (pos === -1) throw new Error('Derived helper already detached');
  this.derivedHelpers.splice(pos, 1);
};

/**
 * This method returns true if there is currently at least one on-going search.
 * @return {boolean} true if there is a search pending
 */
AlgoliaSearchHelper.prototype.hasPendingRequests = function () {
  return this._currentNbQueries > 0;
};

/**
 * @typedef AlgoliaSearchHelper.NumericRefinement
 * @type {object}
 * @property {number[]} value the numbers that are used for filtering this attribute with
 * the operator specified.
 * @property {string} operator the faceting data: value, number of entries
 * @property {string} type will be 'numeric'
 */

/**
 * @typedef AlgoliaSearchHelper.FacetRefinement
 * @type {object}
 * @property {string} value the string use to filter the attribute
 * @property {string} type the type of filter: 'conjunctive', 'disjunctive', 'exclude'
 */

module.exports = AlgoliaSearchHelper;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/compact.js":
/*!********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/compact.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function compact(array) {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter(Boolean);
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/defaultsPure.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/defaultsPure.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


// NOTE: this behaves like lodash/defaults, but doesn't mutate the target
// it also preserve keys order
module.exports = function defaultsPure() {
  var sources = Array.prototype.slice.call(arguments);

  return sources.reduceRight(function (acc, source) {
    Object.keys(Object(source)).forEach(function (key) {
      if (source[key] === undefined) {
        return;
      }
      if (acc[key] !== undefined) {
        // remove if already added, so that we can add it in correct order
        delete acc[key];
      }
      acc[key] = source[key];
    });
    return acc;
  }, {});
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/escapeFacetValue.js ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";


/**
 * Replaces a leading - with \-
 * @private
 * @param {any} value the facet value to replace
 * @returns {any} the escaped facet value or the value if it was not a string
 */
function escapeFacetValue(value) {
  if (typeof value !== 'string') return value;

  return String(value).replace(/^-/, '\\-');
}

/**
 * Replaces a leading \- with -
 * @private
 * @param {any} value the escaped facet value
 * @returns {any} the unescaped facet value or the value if it was not a string
 */
function unescapeFacetValue(value) {
  if (typeof value !== 'string') return value;

  return value.replace(/^\\-/, '-');
}

module.exports = {
  escapeFacetValue: escapeFacetValue,
  unescapeFacetValue: unescapeFacetValue,
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/find.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/find.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";


// @MAJOR can be replaced by native Array#find when we change support
module.exports = function find(array, comparator) {
  if (!Array.isArray(array)) {
    return undefined;
  }

  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return array[i];
    }
  }

  return undefined;
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/findIndex.js":
/*!**********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/findIndex.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


// @MAJOR can be replaced by native Array#findIndex when we change support
module.exports = function find(array, comparator) {
  if (!Array.isArray(array)) {
    return -1;
  }

  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return i;
    }
  }
  return -1;
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/formatSort.js":
/*!***********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/formatSort.js ***!
  \***********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var find = __webpack_require__(/*! ./find */ "./node_modules/algoliasearch-helper/src/functions/find.js");

/**
 * Transform sort format from user friendly notation to lodash format
 * @param {string[]} sortBy array of predicate of the form "attribute:order"
 * @param {string[]} [defaults] array of predicate of the form "attribute:order"
 * @return {array.<string[]>} array containing 2 elements : attributes, orders
 */
module.exports = function formatSort(sortBy, defaults) {
  var defaultInstructions = (defaults || []).map(function (sort) {
    return sort.split(':');
  });

  return sortBy.reduce(
    function preparePredicate(out, sort) {
      var sortInstruction = sort.split(':');

      var matchingDefault = find(
        defaultInstructions,
        function (defaultInstruction) {
          return defaultInstruction[0] === sortInstruction[0];
        }
      );

      if (sortInstruction.length > 1 || !matchingDefault) {
        out[0].push(sortInstruction[0]);
        out[1].push(sortInstruction[1]);
        return out;
      }

      out[0].push(matchingDefault[0]);
      out[1].push(matchingDefault[1]);
      return out;
    },
    [[], []]
  );
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/inherits.js":
/*!*********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/inherits.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


function inherits(ctor, superCtor) {
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
}

module.exports = inherits;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/intersection.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/intersection.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


function intersection(arr1, arr2) {
  return arr1.filter(function (value, index) {
    return (
      arr2.indexOf(value) > -1 &&
      arr1.indexOf(value) === index /* skips duplicates */
    );
  });
}

module.exports = intersection;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/merge.js":
/*!******************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/merge.js ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";


function clone(value) {
  if (typeof value === 'object' && value !== null) {
    return _merge(Array.isArray(value) ? [] : {}, value);
  }
  return value;
}

function isObjectOrArrayOrFunction(value) {
  return (
    typeof value === 'function' ||
    Array.isArray(value) ||
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

function _merge(target, source) {
  if (target === source) {
    return target;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (var key in source) {
    if (
      !Object.prototype.hasOwnProperty.call(source, key) ||
      key === '__proto__' ||
      key === 'constructor'
    ) {
      // eslint-disable-next-line no-continue
      continue;
    }

    var sourceVal = source[key];
    var targetVal = target[key];

    if (typeof targetVal !== 'undefined' && typeof sourceVal === 'undefined') {
      // eslint-disable-next-line no-continue
      continue;
    }

    if (
      isObjectOrArrayOrFunction(targetVal) &&
      isObjectOrArrayOrFunction(sourceVal)
    ) {
      target[key] = _merge(targetVal, sourceVal);
    } else {
      target[key] = clone(sourceVal);
    }
  }
  return target;
}

/**
 * This method is like Object.assign, but recursively merges own and inherited
 * enumerable keyed properties of source objects into the destination object.
 *
 * NOTE: this behaves like lodash/merge, but:
 * - does mutate functions if they are a source
 * - treats non-plain objects as plain
 * - does not work for circular objects
 * - treats sparse arrays as sparse
 * - does not convert Array-like objects (Arguments, NodeLists, etc.) to arrays
 *
 * @param {Object} target The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 */
function merge(target) {
  if (!isObjectOrArrayOrFunction(target)) {
    target = {};
  }

  for (var i = 1, l = arguments.length; i < l; i++) {
    var source = arguments[i];

    if (isObjectOrArrayOrFunction(source)) {
      _merge(target, source);
    }
  }
  return target;
}

module.exports = merge;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js":
/*!**************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/objectHasKeys.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";


function objectHasKeys(obj) {
  return obj && Object.keys(obj).length > 0;
}

module.exports = objectHasKeys;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/omit.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/omit.js ***!
  \*****************************************************************/
/***/ ((module) => {

"use strict";


// https://github.com/babel/babel/blob/3aaafae053fa75febb3aa45d45b6f00646e30ba4/packages/babel-helpers/src/helpers.js#L604-L620
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source === null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key;
  var i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    // eslint-disable-next-line no-continue
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

module.exports = _objectWithoutPropertiesLoose;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/orderBy.js":
/*!********************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/orderBy.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


function compareAscending(value, other) {
  if (value !== other) {
    var valIsDefined = value !== undefined;
    var valIsNull = value === null;

    var othIsDefined = other !== undefined;
    var othIsNull = other === null;

    if (
      (!othIsNull && value > other) ||
      (valIsNull && othIsDefined) ||
      !valIsDefined
    ) {
      return 1;
    }
    if (
      (!valIsNull && value < other) ||
      (othIsNull && valIsDefined) ||
      !othIsDefined
    ) {
      return -1;
    }
  }
  return 0;
}

/**
 * @param {Array<object>} collection object with keys in attributes
 * @param {Array<string>} iteratees attributes
 * @param {Array<string>} orders asc | desc
 * @return {Array<object>} sorted collection
 */
function orderBy(collection, iteratees, orders) {
  if (!Array.isArray(collection)) {
    return [];
  }

  if (!Array.isArray(orders)) {
    orders = [];
  }

  var result = collection.map(function (value, index) {
    return {
      criteria: iteratees.map(function (iteratee) {
        return value[iteratee];
      }),
      index: index,
      value: value,
    };
  });

  result.sort(function comparer(object, other) {
    var index = -1;

    while (++index < object.criteria.length) {
      var res = compareAscending(object.criteria[index], other.criteria[index]);
      if (res) {
        if (index >= orders.length) {
          return res;
        }
        if (orders[index] === 'desc') {
          return -res;
        }
        return res;
      }
    }

    // This ensures a stable sort in V8 and other engines.
    // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  });

  return result.map(function (res) {
    return res.value;
  });
}

module.exports = orderBy;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/functions/valToNumber.js":
/*!************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/functions/valToNumber.js ***!
  \************************************************************************/
/***/ ((module) => {

"use strict";


function valToNumber(v) {
  if (typeof v === 'number') {
    return v;
  } else if (typeof v === 'string') {
    return parseFloat(v);
  } else if (Array.isArray(v)) {
    return v.map(valToNumber);
  }

  throw new Error(
    'The value should be a number, a parsable string or an array of those.'
  );
}

module.exports = valToNumber;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/requestBuilder.js":
/*!*****************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/requestBuilder.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var merge = __webpack_require__(/*! ./functions/merge */ "./node_modules/algoliasearch-helper/src/functions/merge.js");

function sortObject(obj) {
  return Object.keys(obj)
    .sort()
    .reduce(function (acc, curr) {
      acc[curr] = obj[curr];
      return acc;
    }, {});
}

var requestBuilder = {
  /**
   * Get all the queries to send to the client, those queries can used directly
   * with the Algolia client.
   * @private
   * @param  {string} index The name of the index
   * @param  {SearchParameters} state The state from which to get the queries
   * @return {object[]} The queries
   */
  _getQueries: function getQueries(index, state) {
    var queries = [];

    // One query for the hits
    queries.push({
      indexName: index,
      params: requestBuilder._getHitsSearchParams(state),
    });

    // One for each disjunctive facets
    state.getRefinedDisjunctiveFacets().forEach(function (refinedFacet) {
      queries.push({
        indexName: index,
        params: requestBuilder._getDisjunctiveFacetSearchParams(
          state,
          refinedFacet
        ),
      });
    });

    // More to get the parent levels of the hierarchical facets when refined
    state.getRefinedHierarchicalFacets().forEach(function (refinedFacet) {
      var hierarchicalFacet = state.getHierarchicalFacetByName(refinedFacet);
      var currentRefinement = state.getHierarchicalRefinement(refinedFacet);
      var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);

      // If we are deeper than level 0 (starting from `beer > IPA`)
      // we want to get all parent values
      if (
        currentRefinement.length > 0 &&
        currentRefinement[0].split(separator).length > 1
      ) {
        // We generate a map of the filters we will use for our facet values queries
        var filtersMap = currentRefinement[0]
          .split(separator)
          .slice(0, -1)
          .reduce(function createFiltersMap(map, segment, level) {
            return map.concat({
              attribute: hierarchicalFacet.attributes[level],
              value:
                level === 0
                  ? segment
                  : [map[map.length - 1].value, segment].join(separator),
            });
          }, []);

        filtersMap.forEach(function (filter, level) {
          var params = requestBuilder._getDisjunctiveFacetSearchParams(
            state,
            filter.attribute,
            level === 0
          );

          // Keep facet filters unrelated to current hierarchical attributes
          function hasHierarchicalFacetFilter(value) {
            return hierarchicalFacet.attributes.some(function (attribute) {
              return attribute === value.split(':')[0];
            });
          }

          var filteredFacetFilters = (params.facetFilters || []).reduce(
            function (acc, facetFilter) {
              if (Array.isArray(facetFilter)) {
                var filtered = facetFilter.filter(function (filterValue) {
                  return !hasHierarchicalFacetFilter(filterValue);
                });

                if (filtered.length > 0) {
                  acc.push(filtered);
                }
              }

              if (
                typeof facetFilter === 'string' &&
                !hasHierarchicalFacetFilter(facetFilter)
              ) {
                acc.push(facetFilter);
              }

              return acc;
            },
            []
          );

          var parent = filtersMap[level - 1];
          if (level > 0) {
            params.facetFilters = filteredFacetFilters.concat(
              parent.attribute + ':' + parent.value
            );
          } else {
            params.facetFilters =
              filteredFacetFilters.length > 0
                ? filteredFacetFilters
                : undefined;
          }

          queries.push({ indexName: index, params: params });
        });
      }
    });

    return queries;
  },

  /**
   * Build search parameters used to fetch hits
   * @private
   * @param  {SearchParameters} state The state from which to get the queries
   * @return {object.<string, any>} The search parameters for hits
   */
  _getHitsSearchParams: function (state) {
    var facets = state.facets
      .concat(state.disjunctiveFacets)
      .concat(requestBuilder._getHitsHierarchicalFacetsAttributes(state))
      .sort();

    var facetFilters = requestBuilder._getFacetFilters(state);
    var numericFilters = requestBuilder._getNumericFilters(state);
    var tagFilters = requestBuilder._getTagFilters(state);
    var additionalParams = {
      facets: facets.indexOf('*') > -1 ? ['*'] : facets,
      tagFilters: tagFilters,
    };

    if (facetFilters.length > 0) {
      additionalParams.facetFilters = facetFilters;
    }

    if (numericFilters.length > 0) {
      additionalParams.numericFilters = numericFilters;
    }

    return sortObject(merge({}, state.getQueryParams(), additionalParams));
  },

  /**
   * Build search parameters used to fetch a disjunctive facet
   * @private
   * @param  {SearchParameters} state The state from which to get the queries
   * @param  {string} facet the associated facet name
   * @param  {boolean} hierarchicalRootLevel ?? FIXME
   * @return {object} The search parameters for a disjunctive facet
   */
  _getDisjunctiveFacetSearchParams: function (
    state,
    facet,
    hierarchicalRootLevel
  ) {
    var facetFilters = requestBuilder._getFacetFilters(
      state,
      facet,
      hierarchicalRootLevel
    );
    var numericFilters = requestBuilder._getNumericFilters(state, facet);
    var tagFilters = requestBuilder._getTagFilters(state);
    var additionalParams = {
      hitsPerPage: 0,
      page: 0,
      analytics: false,
      clickAnalytics: false,
    };

    if (tagFilters.length > 0) {
      additionalParams.tagFilters = tagFilters;
    }

    var hierarchicalFacet = state.getHierarchicalFacetByName(facet);

    if (hierarchicalFacet) {
      additionalParams.facets =
        requestBuilder._getDisjunctiveHierarchicalFacetAttribute(
          state,
          hierarchicalFacet,
          hierarchicalRootLevel
        );
    } else {
      additionalParams.facets = facet;
    }

    if (numericFilters.length > 0) {
      additionalParams.numericFilters = numericFilters;
    }

    if (facetFilters.length > 0) {
      additionalParams.facetFilters = facetFilters;
    }

    return sortObject(merge({}, state.getQueryParams(), additionalParams));
  },

  /**
   * Return the numeric filters in an algolia request fashion
   * @private
   * @param {SearchParameters} state the state from which to get the filters
   * @param {string} [facetName] the name of the attribute for which the filters should be excluded
   * @return {string[]} the numeric filters in the algolia format
   */
  _getNumericFilters: function (state, facetName) {
    if (state.numericFilters) {
      return state.numericFilters;
    }

    var numericFilters = [];

    Object.keys(state.numericRefinements).forEach(function (attribute) {
      var operators = state.numericRefinements[attribute] || {};
      Object.keys(operators).forEach(function (operator) {
        var values = operators[operator] || [];
        if (facetName !== attribute) {
          values.forEach(function (value) {
            if (Array.isArray(value)) {
              var vs = value.map(function (v) {
                return attribute + operator + v;
              });
              numericFilters.push(vs);
            } else {
              numericFilters.push(attribute + operator + value);
            }
          });
        }
      });
    });

    return numericFilters;
  },

  /**
   * Return the tags filters depending on which format is used, either tagFilters or tagRefinements
   * @private
   * @param {SearchParameters} state the state from which to get the filters
   * @return {string} Tag filters in a single string
   */
  _getTagFilters: function (state) {
    if (state.tagFilters) {
      return state.tagFilters;
    }

    return state.tagRefinements.join(',');
  },

  /**
   * Build facetFilters parameter based on current refinements. The array returned
   * contains strings representing the facet filters in the algolia format.
   * @private
   * @param  {SearchParameters} state The state from which to get the queries
   * @param  {string} [facet] if set, the current disjunctive facet
   * @param  {boolean} [hierarchicalRootLevel] ?? FIXME
   * @return {array.<string>} The facet filters in the algolia format
   */
  _getFacetFilters: function (state, facet, hierarchicalRootLevel) {
    var facetFilters = [];

    var facetsRefinements = state.facetsRefinements || {};
    Object.keys(facetsRefinements)
      .sort()
      .forEach(function (facetName) {
        var facetValues = facetsRefinements[facetName] || [];
        facetValues.sort().forEach(function (facetValue) {
          facetFilters.push(facetName + ':' + facetValue);
        });
      });

    var facetsExcludes = state.facetsExcludes || {};
    Object.keys(facetsExcludes)
      .sort()
      .forEach(function (facetName) {
        var facetValues = facetsExcludes[facetName] || [];
        facetValues.sort().forEach(function (facetValue) {
          facetFilters.push(facetName + ':-' + facetValue);
        });
      });

    var disjunctiveFacetsRefinements = state.disjunctiveFacetsRefinements || {};
    Object.keys(disjunctiveFacetsRefinements)
      .sort()
      .forEach(function (facetName) {
        var facetValues = disjunctiveFacetsRefinements[facetName] || [];
        if (facetName === facet || !facetValues || facetValues.length === 0) {
          return;
        }
        var orFilters = [];

        facetValues.sort().forEach(function (facetValue) {
          orFilters.push(facetName + ':' + facetValue);
        });

        facetFilters.push(orFilters);
      });

    var hierarchicalFacetsRefinements =
      state.hierarchicalFacetsRefinements || {};
    Object.keys(hierarchicalFacetsRefinements)
      .sort()
      .forEach(function (facetName) {
        var facetValues = hierarchicalFacetsRefinements[facetName] || [];
        var facetValue = facetValues[0];

        if (facetValue === undefined) {
          return;
        }

        var hierarchicalFacet = state.getHierarchicalFacetByName(facetName);
        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
        var attributeToRefine;
        var attributesIndex;

        // we ask for parent facet values only when the `facet` is the current hierarchical facet
        if (facet === facetName) {
          // if we are at the root level already, no need to ask for facet values, we get them from
          // the hits query
          if (
            facetValue.indexOf(separator) === -1 ||
            (!rootPath && hierarchicalRootLevel === true) ||
            (rootPath &&
              rootPath.split(separator).length ===
                facetValue.split(separator).length)
          ) {
            return;
          }

          if (!rootPath) {
            attributesIndex = facetValue.split(separator).length - 2;
            facetValue = facetValue.slice(0, facetValue.lastIndexOf(separator));
          } else {
            attributesIndex = rootPath.split(separator).length - 1;
            facetValue = rootPath;
          }

          attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
        } else {
          attributesIndex = facetValue.split(separator).length - 1;

          attributeToRefine = hierarchicalFacet.attributes[attributesIndex];
        }

        if (attributeToRefine) {
          facetFilters.push([attributeToRefine + ':' + facetValue]);
        }
      });

    return facetFilters;
  },

  _getHitsHierarchicalFacetsAttributes: function (state) {
    var out = [];

    return state.hierarchicalFacets.reduce(
      // ask for as much levels as there's hierarchical refinements
      function getHitsAttributesForHierarchicalFacet(
        allAttributes,
        hierarchicalFacet
      ) {
        var hierarchicalRefinement = state.getHierarchicalRefinement(
          hierarchicalFacet.name
        )[0];

        // if no refinement, ask for root level
        if (!hierarchicalRefinement) {
          allAttributes.push(hierarchicalFacet.attributes[0]);
          return allAttributes;
        }

        var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
        var level = hierarchicalRefinement.split(separator).length;
        var newAttributes = hierarchicalFacet.attributes.slice(0, level + 1);

        return allAttributes.concat(newAttributes);
      },
      out
    );
  },

  _getDisjunctiveHierarchicalFacetAttribute: function (
    state,
    hierarchicalFacet,
    rootLevel
  ) {
    var separator = state._getHierarchicalFacetSeparator(hierarchicalFacet);
    if (rootLevel === true) {
      var rootPath = state._getHierarchicalRootPath(hierarchicalFacet);
      var attributeIndex = 0;

      if (rootPath) {
        attributeIndex = rootPath.split(separator).length;
      }
      return [hierarchicalFacet.attributes[attributeIndex]];
    }

    var hierarchicalRefinement =
      state.getHierarchicalRefinement(hierarchicalFacet.name)[0] || '';
    // if refinement is 'beers > IPA > Flying dog',
    // then we want `facets: ['beers > IPA']` as disjunctive facet (parent level values)

    var parentLevel = hierarchicalRefinement.split(separator).length - 1;
    return hierarchicalFacet.attributes.slice(0, parentLevel + 1);
  },

  getSearchForFacetQuery: function (facetName, query, maxFacetHits, state) {
    var stateForSearchForFacetValues = state.isDisjunctiveFacet(facetName)
      ? state.clearRefinements(facetName)
      : state;
    var searchForFacetSearchParameters = {
      facetQuery: query,
      facetName: facetName,
    };
    if (typeof maxFacetHits === 'number') {
      searchForFacetSearchParameters.maxFacetHits = maxFacetHits;
    }
    return sortObject(
      merge(
        {},
        requestBuilder._getHitsSearchParams(stateForSearchForFacetValues),
        searchForFacetSearchParameters
      )
    );
  },
};

module.exports = requestBuilder;


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/utils/isValidUserToken.js":
/*!*************************************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/utils/isValidUserToken.js ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isValidUserToken(userToken) {
  if (userToken === null) {
    return false;
  }
  return /^[a-zA-Z0-9_-]{1,64}$/.test(userToken);
};


/***/ }),

/***/ "./node_modules/algoliasearch-helper/src/version.js":
/*!**********************************************************!*\
  !*** ./node_modules/algoliasearch-helper/src/version.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";


module.exports = '3.14.0';


/***/ }),

/***/ "./node_modules/algoliasearch/dist/algoliasearch.cjs.js":
/*!**************************************************************!*\
  !*** ./node_modules/algoliasearch/dist/algoliasearch.cjs.js ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var cacheCommon = __webpack_require__(/*! @algolia/cache-common */ "./node_modules/@algolia/cache-common/dist/cache-common.esm.js");
var cacheInMemory = __webpack_require__(/*! @algolia/cache-in-memory */ "./node_modules/@algolia/cache-in-memory/dist/cache-in-memory.esm.js");
var clientAnalytics = __webpack_require__(/*! @algolia/client-analytics */ "./node_modules/@algolia/client-analytics/dist/client-analytics.esm.js");
var clientCommon = __webpack_require__(/*! @algolia/client-common */ "./node_modules/@algolia/client-common/dist/client-common.esm.js");
var clientPersonalization = __webpack_require__(/*! @algolia/client-personalization */ "./node_modules/@algolia/client-personalization/dist/client-personalization.esm.js");
var clientSearch = __webpack_require__(/*! @algolia/client-search */ "./node_modules/@algolia/client-search/dist/client-search.esm.js");
var loggerCommon = __webpack_require__(/*! @algolia/logger-common */ "./node_modules/@algolia/logger-common/dist/logger-common.esm.js");
var requesterNodeHttp = __webpack_require__(/*! @algolia/requester-node-http */ "./node_modules/@algolia/requester-node-http/dist/requester-node-http.esm.js");
var transporter = __webpack_require__(/*! @algolia/transporter */ "./node_modules/@algolia/transporter/dist/transporter.esm.js");

function algoliasearch(appId, apiKey, options) {
    const commonOptions = {
        appId,
        apiKey,
        timeouts: {
            connect: 2,
            read: 5,
            write: 30,
        },
        requester: requesterNodeHttp.createNodeHttpRequester(),
        logger: loggerCommon.createNullLogger(),
        responsesCache: cacheCommon.createNullCache(),
        requestsCache: cacheCommon.createNullCache(),
        hostsCache: cacheInMemory.createInMemoryCache(),
        userAgent: transporter.createUserAgent(clientCommon.version).add({
            segment: 'Node.js',
            version: process.versions.node,
        }),
    };
    const searchClientOptions = { ...commonOptions, ...options };
    const initPersonalization = () => (clientOptions) => {
        return clientPersonalization.createPersonalizationClient({
            ...commonOptions,
            ...clientOptions,
            methods: {
                getPersonalizationStrategy: clientPersonalization.getPersonalizationStrategy,
                setPersonalizationStrategy: clientPersonalization.setPersonalizationStrategy,
            },
        });
    };
    return clientSearch.createSearchClient({
        ...searchClientOptions,
        methods: {
            search: clientSearch.multipleQueries,
            searchForFacetValues: clientSearch.multipleSearchForFacetValues,
            multipleBatch: clientSearch.multipleBatch,
            multipleGetObjects: clientSearch.multipleGetObjects,
            multipleQueries: clientSearch.multipleQueries,
            copyIndex: clientSearch.copyIndex,
            copySettings: clientSearch.copySettings,
            copyRules: clientSearch.copyRules,
            copySynonyms: clientSearch.copySynonyms,
            moveIndex: clientSearch.moveIndex,
            listIndices: clientSearch.listIndices,
            getLogs: clientSearch.getLogs,
            listClusters: clientSearch.listClusters,
            multipleSearchForFacetValues: clientSearch.multipleSearchForFacetValues,
            getApiKey: clientSearch.getApiKey,
            addApiKey: clientSearch.addApiKey,
            listApiKeys: clientSearch.listApiKeys,
            updateApiKey: clientSearch.updateApiKey,
            deleteApiKey: clientSearch.deleteApiKey,
            restoreApiKey: clientSearch.restoreApiKey,
            assignUserID: clientSearch.assignUserID,
            assignUserIDs: clientSearch.assignUserIDs,
            getUserID: clientSearch.getUserID,
            searchUserIDs: clientSearch.searchUserIDs,
            listUserIDs: clientSearch.listUserIDs,
            getTopUserIDs: clientSearch.getTopUserIDs,
            removeUserID: clientSearch.removeUserID,
            hasPendingMappings: clientSearch.hasPendingMappings,
            generateSecuredApiKey: clientSearch.generateSecuredApiKey,
            getSecuredApiKeyRemainingValidity: clientSearch.getSecuredApiKeyRemainingValidity,
            destroy: clientCommon.destroy,
            clearDictionaryEntries: clientSearch.clearDictionaryEntries,
            deleteDictionaryEntries: clientSearch.deleteDictionaryEntries,
            getDictionarySettings: clientSearch.getDictionarySettings,
            getAppTask: clientSearch.getAppTask,
            replaceDictionaryEntries: clientSearch.replaceDictionaryEntries,
            saveDictionaryEntries: clientSearch.saveDictionaryEntries,
            searchDictionaryEntries: clientSearch.searchDictionaryEntries,
            setDictionarySettings: clientSearch.setDictionarySettings,
            waitAppTask: clientSearch.waitAppTask,
            customRequest: clientSearch.customRequest,
            initIndex: base => (indexName) => {
                return clientSearch.initIndex(base)(indexName, {
                    methods: {
                        batch: clientSearch.batch,
                        delete: clientSearch.deleteIndex,
                        findAnswers: clientSearch.findAnswers,
                        getObject: clientSearch.getObject,
                        getObjects: clientSearch.getObjects,
                        saveObject: clientSearch.saveObject,
                        saveObjects: clientSearch.saveObjects,
                        search: clientSearch.search,
                        searchForFacetValues: clientSearch.searchForFacetValues,
                        waitTask: clientSearch.waitTask,
                        setSettings: clientSearch.setSettings,
                        getSettings: clientSearch.getSettings,
                        partialUpdateObject: clientSearch.partialUpdateObject,
                        partialUpdateObjects: clientSearch.partialUpdateObjects,
                        deleteObject: clientSearch.deleteObject,
                        deleteObjects: clientSearch.deleteObjects,
                        deleteBy: clientSearch.deleteBy,
                        clearObjects: clientSearch.clearObjects,
                        browseObjects: clientSearch.browseObjects,
                        getObjectPosition: clientSearch.getObjectPosition,
                        findObject: clientSearch.findObject,
                        exists: clientSearch.exists,
                        saveSynonym: clientSearch.saveSynonym,
                        saveSynonyms: clientSearch.saveSynonyms,
                        getSynonym: clientSearch.getSynonym,
                        searchSynonyms: clientSearch.searchSynonyms,
                        browseSynonyms: clientSearch.browseSynonyms,
                        deleteSynonym: clientSearch.deleteSynonym,
                        clearSynonyms: clientSearch.clearSynonyms,
                        replaceAllObjects: clientSearch.replaceAllObjects,
                        replaceAllSynonyms: clientSearch.replaceAllSynonyms,
                        searchRules: clientSearch.searchRules,
                        getRule: clientSearch.getRule,
                        deleteRule: clientSearch.deleteRule,
                        saveRule: clientSearch.saveRule,
                        saveRules: clientSearch.saveRules,
                        replaceAllRules: clientSearch.replaceAllRules,
                        browseRules: clientSearch.browseRules,
                        clearRules: clientSearch.clearRules,
                    },
                });
            },
            initAnalytics: () => (clientOptions) => {
                return clientAnalytics.createAnalyticsClient({
                    ...commonOptions,
                    ...clientOptions,
                    methods: {
                        addABTest: clientAnalytics.addABTest,
                        getABTest: clientAnalytics.getABTest,
                        getABTests: clientAnalytics.getABTests,
                        stopABTest: clientAnalytics.stopABTest,
                        deleteABTest: clientAnalytics.deleteABTest,
                    },
                });
            },
            initPersonalization,
            initRecommendation: () => (clientOptions) => {
                searchClientOptions.logger.info('The `initRecommendation` method is deprecated. Use `initPersonalization` instead.');
                return initPersonalization()(clientOptions);
            },
        },
    });
}
// eslint-disable-next-line functional/immutable-data
algoliasearch.version = clientCommon.version;

module.exports = algoliasearch;


/***/ }),

/***/ "./node_modules/algoliasearch/index.js":
/*!*********************************************!*\
  !*** ./node_modules/algoliasearch/index.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/* eslint-disable functional/immutable-data, import/no-commonjs */
const algoliasearch = __webpack_require__(/*! ./dist/algoliasearch.cjs.js */ "./node_modules/algoliasearch/dist/algoliasearch.cjs.js");

/**
 * The Common JS build is the default entry point for the Node environment. Keep in
 * in mind, that for the browser environment, we hint the bundler to use the UMD
 * build instead as specified on the key `browser` of our `package.json` file.
 */
module.exports = algoliasearch;

/**
 * In addition, we also set explicitly the default export below making
 * this Common JS module in compliance with es6 modules specification.
 */
module.exports["default"] = algoliasearch;


/***/ }),

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const preserveCamelCase = string => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && /[a-zA-Z]/.test(character) && character.toUpperCase() === character) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && /[a-zA-Z]/.test(character) && character.toLowerCase() === character) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = character.toLowerCase() === character && character.toUpperCase() !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = character.toUpperCase() === character && character.toLowerCase() !== character;
		}
	}

	return string;
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = Object.assign({
		pascalCase: false
	}, options);

	const postProcess = x => options.pascalCase ? x.charAt(0).toUpperCase() + x.slice(1) : x;

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	if (input.length === 1) {
		return options.pascalCase ? input.toUpperCase() : input.toLowerCase();
	}

	const hasUpperCase = input !== input.toLowerCase();

	if (hasUpperCase) {
		input = preserveCamelCase(input);
	}

	input = input
		.replace(/^[_.\- ]+/, '')
		.toLowerCase()
		.replace(/[_.\- ]+(\w|$)/g, (_, p1) => p1.toUpperCase())
		.replace(/\d+(\w|$)/g, m => m.toUpperCase());

	return postProcess(input);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;
	var nativeCodeString = '[native code]';

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				if (arg.length) {
					var inner = classNames.apply(null, arg);
					if (inner) {
						classes.push(inner);
					}
				}
			} else if (argType === 'object') {
				if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
					classes.push(arg.toString());
					continue;
				}

				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GatsbyImage: () => (/* binding */ B),
/* harmony export */   MainImage: () => (/* binding */ z),
/* harmony export */   Placeholder: () => (/* binding */ T),
/* harmony export */   StaticImage: () => (/* binding */ V),
/* harmony export */   generateImageData: () => (/* binding */ f),
/* harmony export */   getImage: () => (/* binding */ M),
/* harmony export */   getImageData: () => (/* binding */ x),
/* harmony export */   getLowResolutionImageURL: () => (/* binding */ m),
/* harmony export */   getSrc: () => (/* binding */ S),
/* harmony export */   getSrcSet: () => (/* binding */ N),
/* harmony export */   withArtDirection: () => (/* binding */ I)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




function n() {
  return n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, n.apply(this, arguments);
}
function o(e, t) {
  if (null == e) return {};
  var a,
    i,
    r = {},
    n = Object.keys(e);
  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);
  return r;
}
var s = [.25, .5, 1, 2],
  l = [750, 1080, 1366, 1920],
  u = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
  d = function (e) {
    return console.warn(e);
  },
  c = function (e, t) {
    return e - t;
  },
  h = function (e) {
    return e.map(function (e) {
      return e.src + " " + e.width + "w";
    }).join(",\n");
  };
function g(e) {
  var t = e.lastIndexOf(".");
  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}
function p(e) {
  var t = e.layout,
    i = void 0 === t ? "constrained" : t,
    r = e.width,
    o = e.height,
    s = e.sourceMetadata,
    l = e.breakpoints,
    u = e.aspectRatio,
    d = e.formats,
    c = void 0 === d ? ["auto", "webp"] : d;
  return c = c.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: c,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !u && (u = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (u || 1.3333333333333333))) : (r || (r = o && u ? o * u : s.width ? s.width : o ? Math.round(o / 1.3333333333333333) : 800), u && !o ? o = Math.round(r / u) : u || (u = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: u,
    layout: i,
    formats: c
  }));
}
function m(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = p(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}
function f(e) {
  var t,
    a = (e = p(e)).pluginName,
    i = e.sourceMetadata,
    r = e.generateImageSource,
    o = e.layout,
    u = e.fit,
    c = e.options,
    m = e.width,
    f = e.height,
    b = e.filename,
    k = e.reporter,
    E = void 0 === k ? {
      warn: d
    } : k,
    M = e.backgroundColor,
    S = e.placeholderURL;
  if (a || E.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = g(b)) : i = {
    width: m,
    height: f,
    format: (null == (t = i) ? void 0 : t.format) || g(b) || "auto"
  };
  var N = new Set(e.formats);
  (0 === N.size || N.has("auto") || N.has("")) && (N.delete("auto"), N.delete(""), N.add(i.format)), N.has("jpg") && N.has("png") && (E.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), N.delete("jpg" === i.format ? "png" : "jpg"));
  var x = function (e) {
      var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        u = void 0 === o ? {
          warn: d
        } : o,
        c = e.breakpoints,
        h = void 0 === c ? l : c,
        g = Object.entries({
          width: e.width,
          height: e.height
        }).filter(function (e) {
          var t = e[1];
          return "number" == typeof t && t < 1;
        });
      if (g.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + g.map(function (e) {
        return e.join(": ");
      }).join(", "));
      return "fixed" === i ? function (e) {
        var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          u = e.reporter,
          c = void 0 === u ? {
            warn: d
          } : u,
          h = a.width / a.height,
          g = v(void 0 === l ? s : l);
        if (i && r) {
          var p = y(a, {
            width: i,
            height: r,
            fit: o
          });
          i = p.width, r = p.height, h = p.aspectRatio;
        }
        i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : 800;
        var m = i;
        if (a.width < i || a.height < r) {
          var f = a.width < i ? "width" : "height";
          c.warn("\nThe requested " + f + ' "' + ("width" === f ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + f + " of " + a[f] + "px. If possible, replace the current image with a larger one."), "width" === f ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
        }
        return {
          sizes: g.filter(function (e) {
            return e >= 1;
          }).map(function (e) {
            return Math.round(e * i);
          }).filter(function (e) {
            return e <= a.width;
          }),
          aspectRatio: h,
          presentationWidth: m,
          presentationHeight: Math.round(m / h),
          unscaledWidth: i
        };
      }(e) : "constrained" === i ? w(e) : "fullWidth" === i ? w(n({
        breakpoints: h
      }, e)) : (u.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
        sizes: [r.width],
        presentationWidth: r.width,
        presentationHeight: r.height,
        aspectRatio: r.width / r.height,
        unscaledWidth: r.width
      });
    }(n({}, e, {
      sourceMetadata: i
    })),
    I = {
      sources: []
    },
    W = e.sizes;
  W || (W = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";
      case "fixed":
        return e + "px";
      case "fullWidth":
        return "100vw";
      default:
        return;
    }
  }(x.presentationWidth, o)), N.forEach(function (e) {
    var t = x.sizes.map(function (t) {
      var i = r(b, t, Math.round(t / x.aspectRatio), e, u, c);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      E.warn("[" + a + "] The resolver for image " + b + " returned an invalid value.");
    }).filter(Boolean);
    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === x.unscaledWidth;
      }) || t[0];
      i && (I.fallback = {
        src: i.src,
        srcSet: h(t),
        sizes: W
      });
    } else {
      var n;
      null == (n = I.sources) || n.push({
        srcSet: h(t),
        sizes: W,
        type: "image/" + e
      });
    }
  });
  var j = {
    images: I,
    layout: o,
    backgroundColor: M
  };
  switch (S && (j.placeholder = {
    fallback: S
  }), o) {
    case "fixed":
      j.width = x.presentationWidth, j.height = x.presentationHeight;
      break;
    case "fullWidth":
      j.width = 1, j.height = 1 / x.aspectRatio;
      break;
    case "constrained":
      j.width = e.width || x.presentationWidth || 1, j.height = (j.width || 1) / x.aspectRatio;
  }
  return j;
}
var v = function (e) {
  return Array.from(new Set([1].concat(e))).sort(c);
};
function w(e) {
  var t,
    a = e.sourceMetadata,
    i = e.width,
    r = e.height,
    n = e.fit,
    o = void 0 === n ? "cover" : n,
    l = e.outputPixelDensities,
    u = e.breakpoints,
    d = e.layout,
    h = a.width / a.height,
    g = v(void 0 === l ? s : l);
  if (i && r) {
    var p = y(a, {
      width: i,
      height: r,
      fit: o
    });
    i = p.width, r = p.height, h = p.aspectRatio;
  }
  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(800, a.width)) / h), i || (i = r * h);
  var m = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == u ? void 0 : u.length) > 0 ? (t = u.filter(function (e) {
    return e <= a.width;
  })).length < u.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== d || t.includes(i) || t.push(i), {
    sizes: t = t.sort(c),
    aspectRatio: h,
    presentationWidth: m,
    presentationHeight: Math.round(m / h),
    unscaledWidth: i
  };
}
function y(e, t) {
  var a = e.width / e.height,
    i = t.width,
    r = t.height;
  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;
    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
        o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;
    case "outside":
      var s = t.width ? t.width : 0,
        l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;
    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }
  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}
var b = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
  k = ["images", "placeholder"];
function E() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}
var M = function (e) {
    var t;
    return function (e) {
      var t, a;
      return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
    }(e) ? e : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImageData);
    }(e) ? e.gatsbyImageData : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImage);
    }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
  },
  S = function (e) {
    var t, a, i;
    return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
  },
  N = function (e) {
    var t, a, i;
    return null == (t = M(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
  };
function x(e) {
  var t,
    a = e.baseUrl,
    i = e.urlBuilder,
    r = e.sourceWidth,
    s = e.sourceHeight,
    l = e.pluginName,
    d = void 0 === l ? "getImageData" : l,
    c = e.formats,
    h = void 0 === c ? ["auto"] : c,
    g = e.breakpoints,
    p = e.options,
    m = o(e, b);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = u), f(n({}, m, {
    pluginName: d,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}
function I(e, t) {
  var a,
    i,
    r,
    s = e.images,
    l = e.placeholder,
    u = n({}, o(e, k), {
      images: n({}, s, {
        sources: []
      }),
      placeholder: l && n({}, l, {
        sources: []
      })
    });
  return t.forEach(function (t) {
    var a,
      i = t.media,
      r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = u.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), u.placeholder && u.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = u.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = u.placeholder) || (r = i.sources).push.apply(r, l.sources)), u;
}
var W,
  j = ["src", "srcSet", "loading", "alt", "shouldLoad"],
  R = ["fallback", "sources", "shouldLoad"],
  _ = function (t) {
    var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      u = t.shouldLoad,
      d = o(t, j);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, d, {
      decoding: "async",
      loading: r,
      src: u ? a : void 0,
      "data-src": u ? void 0 : a,
      srcSet: u ? i : void 0,
      "data-srcset": u ? void 0 : i,
      alt: l
    }));
  },
  A = function (t) {
    var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      u = o(t, R),
      d = u.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_, n({}, u, a, {
        sizes: d,
        shouldLoad: l
      }));
    return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
      var a = t.media,
        i = t.srcSet,
        r = t.type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
        key: a + "-" + r + "-" + i,
        type: r,
        media: a,
        srcSet: l ? i : void 0,
        "data-srcset": l ? void 0 : i,
        sizes: d
      });
    }), c) : c;
  };
_.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, A.displayName = "Picture", A.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};
var O = ["fallback"],
  T = function (t) {
    var a = t.fallback,
      i = o(t, O);
    return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, i, {
      fallback: {
        src: a
      },
      "aria-hidden": !0,
      alt: ""
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
  };
T.displayName = "Placeholder", T.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (W = A.propTypes) ? void 0 : W.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};
var z = function (t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, t, {
    shouldLoad: !0
  }))));
};
z.displayName = "MainImage", z.propTypes = A.propTypes;
var L = ["children"],
  q = function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
      type: "module",
      dangerouslySetInnerHTML: {
        __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
      }
    });
  },
  C = function (t) {
    var a = t.layout,
      i = t.width,
      r = t.height;
    return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "aria-hidden": !0,
      style: {
        paddingTop: r / i * 100 + "%"
      }
    }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        maxWidth: i,
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      alt: "",
      role: "presentation",
      "aria-hidden": "true",
      src: "data:image/svg+xml;charset=utf-8,%3Csvg height='" + r + "' width='" + i + "' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",
      style: {
        maxWidth: "100%",
        display: "block",
        position: "static"
      }
    })) : null;
  },
  D = function (a) {
    var i = a.children,
      r = o(a, L);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(q, null));
  },
  P = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
  H = ["style", "className"],
  F = function (e) {
    return e.replace(/\n/g, "");
  },
  B = function (t) {
    var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t.class,
      l = t.style,
      u = t.image,
      d = t.loading,
      c = void 0 === d ? "lazy" : d,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, P);
    if (!u) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
    s && (r = s), g = n({
      objectFit: m,
      objectPosition: f,
      backgroundColor: p
    }, g);
    var w = u.width,
      y = u.height,
      b = u.layout,
      k = u.images,
      M = u.placeholder,
      S = u.backgroundColor,
      N = function (e, t, a) {
        var i = {},
          r = "gatsby-image-wrapper";
        return E() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (E() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
          className: r,
          "data-gatsby-image-wrapper": "",
          style: i
        };
      }(w, y, b),
      x = N.style,
      I = N.className,
      W = o(N, H),
      j = {
        fallback: void 0,
        sources: []
      };
    return k.fallback && (j.fallback = n({}, k.fallback, {
      srcSet: k.fallback.srcSet ? F(k.fallback.srcSet) : void 0
    })), k.sources && (j.sources = k.sources.map(function (e) {
      return n({}, e, {
        srcSet: F(e.srcSet)
      });
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
      style: n({}, x, l, {
        backgroundColor: p
      }),
      className: I + (r ? " " + r : "")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, {
      layout: b,
      width: w,
      height: y
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(T, n({}, function (e, t, a, i, r, o, s, l) {
      var u = {};
      o && (u.backgroundColor = o, "fixed" === a ? (u.width = i, u.height = r, u.backgroundColor = o, u.position = "relative") : ("constrained" === a || "fullWidth" === a) && (u.position = "absolute", u.top = 0, u.left = 0, u.bottom = 0, u.right = 0)), s && (u.objectFit = s), l && (u.objectPosition = l);
      var d = n({}, e, {
        "aria-hidden": !0,
        "data-placeholder-image": "",
        style: n({
          opacity: 1,
          transition: "opacity 500ms linear"
        }, u)
      });
      return E() || (d.style = {
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      }), d;
    }(M, 0, b, w, y, S, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({
      "data-gatsby-image-ssr": "",
      className: h
    }, v, function (e, t, a, i, r) {
      return void 0 === r && (r = {}), E() || (r = n({
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        transform: "translateZ(0)",
        transition: "opacity 250ms linear",
        width: "100%",
        willChange: "opacity"
      }, r)), n({}, a, {
        loading: i,
        shouldLoad: e,
        "data-main-image": "",
        style: n({}, r, {
          opacity: 0
        })
      });
    }("eager" === c, 0, j, c, g)))));
  },
  G = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions", "breakpoints", "outputPixelDensities"],
  V = function (t) {
    return function (a) {
      var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, G);
      return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
        image: r
      }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
    };
  }(B),
  U = function (e, t) {
    return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
  },
  X = new Set(["fixed", "fullWidth", "constrained"]),
  Y = {
    src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
    alt: function (e, t, a) {
      return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
    },
    width: U,
    height: U,
    sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    layout: function (e) {
      if (void 0 !== e.layout && !X.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
    }
  };
V.displayName = "StaticImage", V.propTypes = Y;


/***/ }),

/***/ "./src/components/Footer/index.js":
/*!****************************************!*\
  !*** ./src/components/Footer/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _footer_logo_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./footer_logo.svg */ "./src/components/Footer/footer_logo.svg");
/* harmony import */ var _creative_commons_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./creative_commons.svg */ "./src/components/Footer/creative_commons.svg");


// import "./style.css"


function FooterLogo() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: _footer_logo_svg__WEBPACK_IMPORTED_MODULE_2__["default"],
    alt: "Hike with Gravity Logo",
    loading: "lazy"
  });
}
function CreativeCommonsLogo() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    src: _creative_commons_svg__WEBPACK_IMPORTED_MODULE_3__["default"],
    alt: "Creative Commons license Logo",
    loading: "lazy"
  });
}
const Footer = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("footer", {
  className: "footer"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
  role: "navigation",
  "aria-labelledby": "footer-menu",
  id: "footer-menu"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
  className: "visually-hidden footer-menu__title"
}, "Menu"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
  className: "footer-menu"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/",
  title: "Home page",
  className: "footer-menu__link"
}, "Home")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/hikes",
  title: "Latest hike reports",
  className: "footer-menu__link"
}, "Hikes")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/gear",
  title: "Gear I carry or have used",
  className: "footer-menu__link"
}, "Gear")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/about",
  title: "About Gravity and this site",
  className: "footer-menu__link"
}, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/contact",
  title: "Send a message to Gravity",
  className: "footer-menu__link"
}, "Contact")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "footer-menu__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
  to: "/subscribe",
  title: "Sign up to receive email updates",
  className: "footer-menu__link"
}, "Subscribe")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits__image"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/",
  title: "Home page"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(FooterLogo, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits__copyright"
}, "Copyright 2017 - ", new Date().getFullYear(), " by Jim \"Gravity\" Smith"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "footer-credits__links"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  rel: "license",
  title: "Creative Commons license",
  href: "http://creativecommons.org/licenses/by-nc/4.0/"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(CreativeCommonsLogo, null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "This work is licensed under a", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  rel: "license",
  href: "http://creativecommons.org/licenses/by-nc/4.0/"
}, "\xA0Creative Commons Attribution-NonCommercial 4.0 International License.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "This site was built by", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://www.startinggravity.com"
}, " Starting Gravity"), " using the open-source projects ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://drupal.org"
}, "Drupal"), " and", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://gatsbyjs.org"
}, " GatsbyJS"), "."))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/components/HeaderMenu/index.js":
/*!********************************************!*\
  !*** ./src/components/HeaderMenu/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Logo */ "./src/components/Logo/index.js");
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");



class HeaderMenu extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  constructor(...args) {
    super(...args);
    this.state = {
      showMenu: false,
      showSearch: false
    };
    this.toggleMenu = () => {
      this.setState({
        showMenu: !this.state.showMenu
      });
    };
  }
  render() {
    const menuActive = this.state.showMenu ? "show-menu" : "no-menu";
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: `off-canvas ${menuActive}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "search-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
      role: "navigation",
      className: "main-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", {
      className: "visually-hidden"
    }, "Main navigation"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      className: "main-menu__list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item main-menu__item--expanded"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes",
      title: "Hike Reports",
      className: "main-menu__link main-menu__link--hikes text-3xl"
    }, "Hikes"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
      className: "menu main-menu__submenu",
      style: {
        borderTop: "1px solid #999"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/at-2017",
      title: "Hike Reports: Aooalachian Trail 2017",
      className: "main-menu__link main-menu__link--appalachian-trail-2017"
    }, "Appalachian Trail 2017")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/pct-2019",
      title: "Hike Reports: Pacific Crest Trail 2019",
      className: "main-menu__link main-menu__link--pacific-crest-trail-2019"
    }, "Pacific Crest Trail 2019")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/bmt-2020",
      title: "Hike Reports: Benton MacKaye Trail 2020",
      className: "main-menu__link main-menu__link--benton-mackaye-trail-2020"
    }, "Benton MacKaye Trail 2020")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/cdt-2021",
      title: "Hike Reports: Continental Divide Trail 2021",
      className: "main-menu__link main-menu__link--continental-divide-trail-2021"
    }, "Continental Divide Trail 2021")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/hikes/pt-2022",
      title: "Hike Reports: Pinhoti Trail 2022",
      className: "main-menu__link main-menu__link--continental-divide-trail-2021"
    }, "Pinhoti Trail 2022")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item main-menu__item--active-trail"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/gear",
      title: "Gear",
      className: "main-menu__link main-menu__link--gear text-3xl"
    }, "Gear")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/about",
      title: "About Gravity and this site",
      className: "main-menu__link main-menu__link--about text-3xl"
    }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/contact",
      title: "Contact Gravity",
      className: "main-menu__link main-menu__link--contact text-3xl"
    }, "Contact")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
      className: "main-menu__item"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      to: "/subscribe",
      title: "Sign up to receive email updates",
      className: "main-menu__link main-menu__link--subscribe text-xl"
    }, "Sign up to receive email updates"))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "header__wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "header__inner flex flex-row justify-between items-start"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "site-header__menu-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
      className: "menu-button__toggle js-toggle__menu",
      href: "#",
      onClick: this.toggleMenu,
      "aria-label": "Menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "menu-button__text"
    }, "Menu"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "site-logo"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "site-header__search-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_2__.Link, {
      "aria-label": "Search",
      className: "search-button__toggle js-toggle__search",
      to: "/search"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "search-button__text"
    }, "Search")))))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderMenu);

/***/ }),

/***/ "./src/components/Logo/index.js":
/*!**************************************!*\
  !*** ./src/components/Logo/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logo.svg */ "./src/components/Logo/logo.svg");


const Logo = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/",
  rel: "Home",
  className: "site-header__logo-link"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "site-header__logo-img site-header__logo-img--sm md:site-header__logo-img--med lg:site-header__logo-img--lg"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
  src: _logo_svg__WEBPACK_IMPORTED_MODULE_1__["default"],
  alt: "Hike with Gtravity"
})));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);

/***/ }),

/***/ "./src/components/SocialMedia/index.js":
/*!*********************************************!*\
  !*** ./src/components/SocialMedia/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const SocialMedia = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
  className: "social-media"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Follow me and subscribe to my email newsletter"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
  className: "social-media__list"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://twitter.com/hikewithgravity",
  title: "Follow me on Twitter",
  className: "social-media__link social-media__link--twitter"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Twitter"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://www.instagram.com/hikewithgravity/",
  title: "Follow me on Instagram",
  className: "social-media__link social-media__link--instagram"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Instagram"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "https://www.facebook.com/jim.smith",
  title: "Follow me on Facebook",
  className: "social-media__link social-media__link--facebook"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Facebook"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/subscribe",
  title: "Sign up to receive email updates",
  className: "social-media__link social-media__link--subscribe"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "Subscribe"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
  className: "social-media__item"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
  href: "/hikes.xml",
  title: "RSS Feed",
  className: "social-media__link social-media__link--rss"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
  className: "visually-hidden"
}, "RSS")))));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialMedia);

/***/ }),

/***/ "./src/components/field/title.js":
/*!***************************************!*\
  !*** ./src/components/field/title.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostTitle)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function PostTitle({
  children
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    className: "text-gray-100 font-bold text-1xl sm:text-2xl lg:text-3xl leading-none py-10"
  }, children);
}

/***/ }),

/***/ "./src/components/layout.js":
/*!**********************************!*\
  !*** ./src/components/layout.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _HeaderMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HeaderMenu */ "./src/components/HeaderMenu/index.js");
/* harmony import */ var _SocialMedia__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SocialMedia */ "./src/components/SocialMedia/index.js");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Footer */ "./src/components/Footer/index.js");
/* harmony import */ var _helpers_trigger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../helpers/trigger */ "./src/helpers/trigger.js");
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/globals.css */ "./src/styles/globals.css");
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_5__);


// import { useStaticQuery, graphql } from "gatsby"





const Layout = ({
  children
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_helpers_trigger__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_HeaderMenu__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", {
    className: "main overflow-hidden"
  }, children, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "py-0 bg-white"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "main__social mt-6 mx-auto max-w-3xl px-5"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_SocialMedia__WEBPACK_IMPORTED_MODULE_2__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Footer__WEBPACK_IMPORTED_MODULE_3__["default"], null));
};
Layout.propTypes = {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_6___default().node).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/post-preview.js":
/*!****************************************!*\
  !*** ./src/components/post-preview.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-dom/dist/es/widgets/Highlight.js");
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-dom/dist/es/widgets/Snippet.js");



const PostPreview = ({
  hit
}) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__.Link, {
    to: hit.url
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_2__["default"], {
    hit: hit,
    attribute: "title",
    tagName: "mark"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_3__["default"], {
    hit: hit,
    attribute: "elements",
    tagName: "mark"
  })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostPreview);

/***/ }),

/***/ "./src/components/seo.js":
/*!*******************************!*\
  !*** ./src/components/seo.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_page_data_sq_d_764694655_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../public/page-data/sq/d/764694655.json */ "./public/page-data/sq/d/764694655.json");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet */ "./node_modules/react-helmet/es/Helmet.js");
/* harmony import */ var _assets_images_hike_with_gravity_logo_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/images/hike-with-gravity-logo.jpg */ "./src/assets/images/hike-with-gravity-logo.jpg");

/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */





function SEO({
  description,
  keywords,
  lang,
  meta,
  title,
  category,
  nodePath,
  nodeImage
}) {
  const {
    site
  } = _public_page_data_sq_d_764694655_json__WEBPACK_IMPORTED_MODULE_0__.data;
  const metaDescription = description || site.siteMetadata.description;
  // const defaultTitle = site.siteMetadata.title
  // const metaKeywords = keywords || site.siteMetadata.keywords
  const defaultImage = `${site.siteMetadata.siteUrl}${_assets_images_hike_with_gravity_logo_jpg__WEBPACK_IMPORTED_MODULE_3__["default"]}`;
  const defaultUrl = site.siteMetadata.siteUrl;
  const blogPath = site.siteMetadata.siteUrl + nodePath;
  const imagePath = site.siteMetadata.siteUrl + nodeImage;
  const url = blogPath + `/` || 0;
  const metaImage = imagePath || defaultImage;
  const metaTitle = title || site.siteMetadata.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(react_helmet__WEBPACK_IMPORTED_MODULE_2__.Helmet, {
    htmlAttributes: {
      lang
    },
    title: metaTitle,
    titleTemplate: `%s | ${site.siteMetadata.title}`,
    meta: [{
      name: `HandheldFriendly`,
      content: `true`
    }, {
      name: `MobileOptimized`,
      content: `width`
    }, {
      name: `description`,
      content: metaDescription
    }, {
      name: `thumbnail`,
      content: metaImage
    }, {
      property: `image`,
      content: metaImage
    }, {
      property: `og:site_name`,
      content: `Hike with Gravity`
    }, {
      property: `og:title`,
      content: metaTitle
    }, {
      property: `og:url`,
      content: url
    }, {
      property: `og:description`,
      content: metaDescription
    }, {
      property: `og:type`,
      content: `website`
    }, {
      property: `og:locale`,
      content: `en-US`
    }, {
      property: `og:image`,
      content: metaImage
    }, {
      property: `og:image:type`,
      content: `image/jpeg`
    }, {
      name: `og:image:alt`,
      content: metaTitle
    }, {
      name: `og:image:width`,
      content: `1200`
    }, {
      name: `og:image:height`,
      content: `675`
    }, {
      property: `article:author`,
      content: `641895471`
    }, {
      property: `article:publisher`,
      content: `https://www.facebook.com/jim.smith`
    }, {
      name: `twitter:site`,
      content: `@hikewithgravity`
    }, {
      name: `twitter:card`,
      content: `summary_large_image`
    }, {
      property: `twitter:image`,
      content: metaImage
    }, {
      name: `twitter:site:id`,
      content: `2986914490`
    }, {
      name: `twitter:creator`,
      content: site.siteMetadata.author
    }, {
      name: `twitter:creator:id`,
      content: `2986914490`
    }, {
      name: `twitter:title`,
      content: metaTitle
    }, {
      name: `twitter:description`,
      content: metaDescription
    }, {
      name: `twitter:image:alt`,
      content: metaTitle
    }, {
      name: `twitter:image:width`,
      content: `600`
    }, {
      name: `twitter:image:height`,
      content: `338`
    }, {
      name: `news_keywords`,
      content: `backpacking, hiking, Appalachian Trail, Continental Divide Trail, Pacific Crest Trail, AT, PCT, CDT, long distance hiking, thru-hiking`
    }, {
      name: `keywords`,
      content: `backpacking, hiking, Appalachian Trail, Continental Divide Trail, Pacific Crest Trail, AT, PCT, CDT, long distance hiking, thru-hiking`
    }, {
      name: `google-site-verification`,
      content: `x_GeJdd3hdrVD476zhxG_VKS_kITt0_24ILpqhfkPhk`
    }, {
      property: `fb:app_id`,
      content: `1224500344298525`
    }, {
      property: `fb:admins`,
      content: `641895471`
    },
    // {
    //   name: `keywords`,
    //   content: metaKeywords.join(", "),
    // },
    {
      name: `robots`,
      content: `index, follow`
    }, {
      name: `referrer`,
      content: `no-referrer-when-downgrade`
    }, {
      name: `rights`,
      content: `This work is licensed under a Creative Commons Attribution-NonCommercial 4.0 International License.`
    }].concat(meta)
  });
}
SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};
SEO.propTypes = {
  description: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  lang: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string),
  meta: prop_types__WEBPACK_IMPORTED_MODULE_4___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_4___default().object)),
  title: (prop_types__WEBPACK_IMPORTED_MODULE_4___default().string).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SEO);

/***/ }),

/***/ "./src/helpers/trigger.js":
/*!********************************!*\
  !*** ./src/helpers/trigger.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

class Trigger extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(...args) {
    super(...args);
    this.toggleBodyClass = () => {
      if (window.scrollY < 100) {
        document.body.classList.remove("content--scroll");
      } else {
        document.body.classList.add("content--scroll");
      }
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.toggleBodyClass);
    this.toggleBodyClass();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.toggleBodyClass);
  }
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trigger);

/***/ }),

/***/ "./src/pages/search.js?export=default":
/*!********************************************!*\
  !*** ./src/pages/search.js?export=default ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var algoliasearch_lite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! algoliasearch/lite */ "./node_modules/algoliasearch/index.js");
/* harmony import */ var algoliasearch_lite__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(algoliasearch_lite__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-core/dist/es/connectors/connectStateResults.js");
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-core/dist/es/widgets/InstantSearch.js");
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-dom/dist/es/widgets/SearchBox.js");
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-dom/dist/es/widgets/Hits.js");
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-dom/dist/es/widgets/Pagination.js");
/* harmony import */ var react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-instantsearch-dom */ "./node_modules/react-instantsearch-dom/dist/es/widgets/PoweredBy.js");
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/layout */ "./src/components/layout.js");
/* harmony import */ var _components_seo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/seo */ "./src/components/seo.js");
/* harmony import */ var _components_post_preview__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/post-preview */ "./src/components/post-preview.js");
/* harmony import */ var _components_field_title__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/field/title */ "./src/components/field/title.js");
/* harmony import */ var _styles_search_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/search.css */ "./src/styles/search.css");
/* harmony import */ var _styles_search_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_search_css__WEBPACK_IMPORTED_MODULE_5__);









const searchClient = algoliasearch_lite__WEBPACK_IMPORTED_MODULE_6___default()("GRBKEZ1C17", "108fc3ecd716a4c434ea81b52e149727");
class BlogIndex extends (react__WEBPACK_IMPORTED_MODULE_0___default().Component) {
  render() {
    const fullTitle = "Search";
    const coverImage = "../images/weminunche-wilderness_chicago-basin.jpeg";
    const socialImage = "/search_page.jpeg";
    const thisPath = "/search";
    const HitCount = (0,react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_7__["default"])(({
      searchResults
    }) => {
      const hitCount = searchResults && searchResults.nbHits;
      return hitCount > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "HitCount"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, hitCount, " result", hitCount !== 1 ? `s` : ``, " were found")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "HitCount"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "No results were found for your search."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Check your spelling and try again."));
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_seo__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Search",
      description: "Search for trip reports from any of my hikes.",
      keywords: [`Pacific Crest Trail`, `Appalachian Trail`, `Continental Divide Trail`, `Mojave Desert`, `Sierra Nevada`, `Great Smoky Mountains`, `White Mountains`, `Springer Mountain`, `Mount Katahdin`, "Benton MacKaye", "Pinhoti", `AT`, `PCT`, `CDT`, `thru-hiking`, `thru-gear`, `Triple Crown`, `backpacking`, `hiking`, `trail`, `long distance hiking`, `blog`, `Gravity`, "Hike with Gravity"],
      nodePath: thisPath,
      nodeImage: socialImage
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "main__content search-results-page"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "h-screen relative max-h-96 list-page"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "heading-container absolute flex justify-center items-center bottom-20 w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "mx-2 text-center w-9/12 cover-text"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_field_title__WEBPACK_IMPORTED_MODULE_4__["default"], null, fullTitle))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "fixed -z-10 cover-image h-screen max-h-96"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "w-full"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_8__.StaticImage, {
      alt: "Cirue of the Towers, Wind River Range, Wyoming",
      src: coverImage,
      className: "h-screen max-h-96 cover-img",
      loading: "eager",
      __imageData: __webpack_require__(/*! ./.cache/caches/gatsby-plugin-image/4021310346.json */ "./.cache/caches/gatsby-plugin-image/4021310346.json")
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "relative z-0 bg-white"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "mx-auto max-w-5xl"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "mt-6 text-2xl prose mx-auto max-w-3xl px-5 py-4 text-gravBlack"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_9__["default"], {
      searchClient: searchClient,
      indexName: "hike_BLOG"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_10__["default"], {
      placeholder: "Find it here..."
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(HitCount, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_11__["default"], {
      hitComponent: _components_post_preview__WEBPACK_IMPORTED_MODULE_3__["default"]
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_12__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_instantsearch_dom__WEBPACK_IMPORTED_MODULE_13__["default"], null)))))));
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlogIndex);
const pageQuery = "2324703104";

/***/ }),

/***/ "./src/styles/globals.css":
/*!********************************!*\
  !*** ./src/styles/globals.css ***!
  \********************************/
/***/ (() => {



/***/ }),

/***/ "./src/styles/search.css":
/*!*******************************!*\
  !*** ./src/styles/search.css ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/react-fast-compare/index.js":
/*!**************************************************!*\
  !*** ./node_modules/react-fast-compare/index.js ***!
  \**************************************************/
/***/ ((module) => {

/* global Map:readonly, Set:readonly, ArrayBuffer:readonly */

var hasElementType = typeof Element !== 'undefined';
var hasMap = typeof Map === 'function';
var hasSet = typeof Set === 'function';
var hasArrayBuffer = typeof ArrayBuffer === 'function' && !!ArrayBuffer.isView;

// Note: We **don't** need `envHasBigInt64Array` in fde es6/index.js

function equal(a, b) {
  // START: fast-deep-equal es6/index.js 3.1.3
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    // START: Modifications:
    // 1. Extra `has<Type> &&` helpers in initial condition allow es6 code
    //    to co-exist with es5.
    // 2. Replace `for of` with es5 compliant iteration using `for`.
    //    Basically, take:
    //
    //    ```js
    //    for (i of a.entries())
    //      if (!b.has(i[0])) return false;
    //    ```
    //
    //    ... and convert to:
    //
    //    ```js
    //    it = a.entries();
    //    while (!(i = it.next()).done)
    //      if (!b.has(i.value[0])) return false;
    //    ```
    //
    //    **Note**: `i` access switches to `i.value`.
    var it;
    if (hasMap && (a instanceof Map) && (b instanceof Map)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!equal(i.value[1], b.get(i.value[0]))) return false;
      return true;
    }

    if (hasSet && (a instanceof Set) && (b instanceof Set)) {
      if (a.size !== b.size) return false;
      it = a.entries();
      while (!(i = it.next()).done)
        if (!b.has(i.value[0])) return false;
      return true;
    }
    // END: Modifications

    if (hasArrayBuffer && ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (a[i] !== b[i]) return false;
      return true;
    }

    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    // START: Modifications:
    // Apply guards for `Object.create(null)` handling. See:
    // - https://github.com/FormidableLabs/react-fast-compare/issues/64
    // - https://github.com/epoberezkin/fast-deep-equal/issues/49
    if (a.valueOf !== Object.prototype.valueOf && typeof a.valueOf === 'function' && typeof b.valueOf === 'function') return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString && typeof a.toString === 'function' && typeof b.toString === 'function') return a.toString() === b.toString();
    // END: Modifications

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    // END: fast-deep-equal

    // START: react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element) return false;

    // custom handling for React/Preact
    for (i = length; i-- !== 0;) {
      if ((keys[i] === '_owner' || keys[i] === '__v' || keys[i] === '__o') && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner
        // Preact-specific: avoid traversing Preact elements' __v and __o
        //    __v = $_original / $_vnode
        //    __o = $_owner
        // These properties contain circular references and are not needed when
        // comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of elements

        continue;
      }

      // all other properties should be traversed as usual
      if (!equal(a[keys[i]], b[keys[i]])) return false;
    }
    // END: react-fast-compare

    // START: fast-deep-equal
    return true;
  }

  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function isEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (((error.message || '').match(/stack|recursion/i))) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('react-fast-compare cannot handle circular refs');
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};


/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/connectors/connectHighlight.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/connectors/connectHighlight.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_createConnector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/createConnector.js */ "./node_modules/react-instantsearch-core/dist/es/core/createConnector.js");
/* harmony import */ var _core_highlight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/highlight.js */ "./node_modules/react-instantsearch-core/dist/es/core/highlight.js");


var highlight = function highlight(_ref) {
  var attribute = _ref.attribute,
    hit = _ref.hit,
    highlightProperty = _ref.highlightProperty,
    _ref$preTag = _ref.preTag,
    preTag = _ref$preTag === void 0 ? _core_highlight_js__WEBPACK_IMPORTED_MODULE_0__.HIGHLIGHT_TAGS.highlightPreTag : _ref$preTag,
    _ref$postTag = _ref.postTag,
    postTag = _ref$postTag === void 0 ? _core_highlight_js__WEBPACK_IMPORTED_MODULE_0__.HIGHLIGHT_TAGS.highlightPostTag : _ref$postTag;
  return (0,_core_highlight_js__WEBPACK_IMPORTED_MODULE_0__.parseAlgoliaHit)({
    attribute: attribute,
    highlightProperty: highlightProperty,
    hit: hit,
    preTag: preTag,
    postTag: postTag
  });
};

/**
 * connectHighlight connector provides the logic to create an highlighter
 * component that will retrieve, parse and render an highlighted attribute
 * from an Algolia hit.
 * @name connectHighlight
 * @kind connector
 * @category connector
 * @providedPropType {function} highlight - function to retrieve and parse an attribute from a hit. It takes a configuration object with 3 attributes: `highlightProperty` which is the property that contains the highlight structure from the records, `attribute` which is the name of the attribute (it can be either a string or an array of strings) to look for and `hit` which is the hit from Algolia. It returns an array of objects `{value: string, isHighlighted: boolean}`. If the element that corresponds to the attribute is an array of strings, it will return a nested array of objects.
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, SearchBox, Hits, connectHighlight } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const CustomHighlight = connectHighlight(
 *   ({ highlight, attribute, hit, highlightProperty }) => {
 *     const highlights = highlight({
 *       highlightProperty: '_highlightResult',
 *       attribute,
 *       hit
 *     });
 *
 *     return highlights.map(part => part.isHighlighted ? (
 *       <mark>{part.value}</mark>
 *     ) : (
 *       <span>{part.value}</span>
 *     ));
 *   }
 * );
 *
 * const Hit = ({ hit }) => (
 *   <p>
 *     <CustomHighlight attribute="name" hit={hit} />
 *   </p>
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <SearchBox defaultRefinement="pho" />
 *     <Hits hitComponent={Hit} />
 *   </InstantSearch>
 * );
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_core_createConnector_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
  displayName: 'AlgoliaHighlighter',
  $$type: 'ais.highlighter',
  propTypes: {},
  getProvidedProps: function getProvidedProps() {
    return {
      highlight: highlight
    };
  }
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/connectors/connectHits.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/connectors/connectHits.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_createConnector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/createConnector.js */ "./node_modules/react-instantsearch-core/dist/es/core/createConnector.js");
/* harmony import */ var _core_indexUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/indexUtils.js */ "./node_modules/react-instantsearch-core/dist/es/core/indexUtils.js");
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-core/dist/es/core/utils.js");




/**
 * connectHits connector provides the logic to create connected
 * components that will render the results retrieved from
 * Algolia.
 *
 * To configure the number of hits retrieved, use [HitsPerPage widget](widgets/HitsPerPage.html),
 * [connectHitsPerPage connector](connectors/connectHitsPerPage.html) or pass the hitsPerPage
 * prop to a [Configure](guide/Search_parameters.html) widget.
 *
 * **Warning:** you will need to use the **objectID** property available on every hit as a key
 * when iterating over them. This will ensure you have the best possible UI experience
 * especially on slow networks.
 * @name connectHits
 * @kind connector
 * @providedPropType {array.<object>} hits - the records that matched the search state
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, Highlight, connectHits } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 * const CustomHits = connectHits(({ hits }) => (
 *   <div>
 *     {hits.map(hit =>
 *       <p key={hit.objectID}>
 *         <Highlight attribute="name" hit={hit} />
 *       </p>
 *     )}
 *   </div>
 * ));
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <CustomHits />
 *   </InstantSearch>
 * );
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_core_createConnector_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
  displayName: 'AlgoliaHits',
  $$type: 'ais.hits',
  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    var results = (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_1__.getResults)(searchResults, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    });
    if (!results) {
      return {
        hits: []
      };
    }
    var hitsWithPositions = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.addAbsolutePositions)(results.hits, results.hitsPerPage, results.page);
    var hitsWithPositionsAndQueryID = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.addQueryID)(hitsWithPositions, results.queryID);
    return {
      hits: hitsWithPositionsAndQueryID
    };
  },
  /*
   * Hits needs to be considered as a widget to trigger a search,
   * even if no other widgets are used.
   *
   * To be considered as a widget you need either:
   * - getSearchParameters
   * - getMetadata
   * - transitionState
   *
   * See: createConnector.tsx
   */
  getSearchParameters: function getSearchParameters(searchParameters) {
    return searchParameters;
  }
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/connectors/connectPagination.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/connectors/connectPagination.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_createConnector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/createConnector.js */ "./node_modules/react-instantsearch-core/dist/es/core/createConnector.js");
/* harmony import */ var _core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/indexUtils.js */ "./node_modules/react-instantsearch-core/dist/es/core/indexUtils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


function getId() {
  return 'page';
}
function getCurrentRefinement(props, searchState, context) {
  var id = getId();
  var page = 1;
  var currentRefinement = (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentRefinementValue)(props, searchState, context, id, page);
  if (typeof currentRefinement === 'string') {
    return parseInt(currentRefinement, 10);
  }
  return currentRefinement;
}
function _refine(props, searchState, nextPage, context) {
  var id = getId();
  var nextValue = _defineProperty({}, id, nextPage);
  var resetPage = false;
  return (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.refineValue)(searchState, nextValue, context, resetPage);
}

/**
 * connectPagination connector provides the logic to build a widget that will
 * let the user displays hits corresponding to a certain page.
 * @name connectPagination
 * @kind connector
 * @propType {boolean} [showFirst=true] - Display the first page link.
 * @propType {boolean} [showLast=false] - Display the last page link.
 * @propType {boolean} [showPrevious=true] - Display the previous page link.
 * @propType {boolean} [showNext=true] - Display the next page link.
 * @propType {number} [padding=3] - How many page links to display around the current page.
 * @propType {number} [totalPages=Infinity] - Maximum number of pages to display.
 * @providedPropType {function} refine - a function to remove a single filter
 * @providedPropType {function} createURL - a function to generate a URL for the corresponding search state
 * @providedPropType {number} nbPages - the total of existing pages
 * @providedPropType {number} currentRefinement - the page refinement currently applied
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_core_createConnector_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
  displayName: 'AlgoliaPagination',
  $$type: 'ais.pagination',
  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    var results = (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.getResults)(searchResults, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    });
    if (!results) {
      return null;
    }
    var nbPages = results.nbPages;
    return {
      nbPages: nbPages,
      currentRefinement: getCurrentRefinement(props, searchState, {
        ais: props.contextValue,
        multiIndexContext: props.indexContextValue
      }),
      canRefine: nbPages > 1
    };
  },
  refine: function refine(props, searchState, nextPage) {
    return _refine(props, searchState, nextPage, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    });
  },
  cleanUp: function cleanUp(props, searchState) {
    return (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.cleanUpValue)(searchState, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    }, getId());
  },
  getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
    return searchParameters.setPage(getCurrentRefinement(props, searchState, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    }) - 1);
  },
  getMetadata: function getMetadata() {
    return {
      id: getId()
    };
  }
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/connectors/connectPoweredBy.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/connectors/connectPoweredBy.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_createConnector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/createConnector.js */ "./node_modules/react-instantsearch-core/dist/es/core/createConnector.js");


/**
 * connectPoweredBy connector provides the logic to build a widget that
 * will display a link to algolia.
 * @name connectPoweredBy
 * @kind connector
 * @providedPropType {string} url - the url to redirect to algolia
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_core_createConnector_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
  displayName: 'AlgoliaPoweredBy',
  $$type: 'ais.poweredBy',
  getProvidedProps: function getProvidedProps() {
    var hostname = typeof window === 'undefined' || typeof window.location === 'undefined' ? '' : window.location.hostname;
    var url = 'https://www.algolia.com/?' + 'utm_source=react-instantsearch&' + 'utm_medium=website&' + "utm_content=".concat(hostname, "&") + 'utm_campaign=poweredby';
    return {
      url: url
    };
  }
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/connectors/connectSearchBox.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/connectors/connectSearchBox.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _core_createConnector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/createConnector.js */ "./node_modules/react-instantsearch-core/dist/es/core/createConnector.js");
/* harmony import */ var _core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/indexUtils.js */ "./node_modules/react-instantsearch-core/dist/es/core/indexUtils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



function getId() {
  return 'query';
}
function getCurrentRefinement(props, searchState, context) {
  var id = getId(props);
  var currentRefinement = (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentRefinementValue)(props, searchState, context, id, '');
  if (currentRefinement) {
    return currentRefinement;
  }
  return '';
}
function _refine(props, searchState, nextRefinement, context) {
  var id = getId();
  var nextValue = _defineProperty({}, id, nextRefinement);
  var resetPage = true;
  return (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.refineValue)(searchState, nextValue, context, resetPage);
}
function _cleanUp(props, searchState, context) {
  return (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.cleanUpValue)(searchState, context, getId());
}

/**
 * connectSearchBox connector provides the logic to build a widget that will
 * let the user search for a query
 * @name connectSearchBox
 * @kind connector
 * @propType {string} [defaultRefinement] - Provide a default value for the query
 * @providedPropType {function} refine - a function to change the current query
 * @providedPropType {string} currentRefinement - the current query used
 * @providedPropType {boolean} isSearchStalled - a flag that indicates if InstantSearch has detected that searches are stalled
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_core_createConnector_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
  displayName: 'AlgoliaSearchBox',
  $$type: 'ais.searchBox',
  propTypes: {
    defaultRefinement: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)
  },
  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    return {
      currentRefinement: getCurrentRefinement(props, searchState, {
        ais: props.contextValue,
        multiIndexContext: props.indexContextValue
      }),
      isSearchStalled: searchResults.isSearchStalled
    };
  },
  refine: function refine(props, searchState, nextRefinement) {
    return _refine(props, searchState, nextRefinement, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    });
  },
  cleanUp: function cleanUp(props, searchState) {
    return _cleanUp(props, searchState, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    });
  },
  getSearchParameters: function getSearchParameters(searchParameters, props, searchState) {
    return searchParameters.setQuery(getCurrentRefinement(props, searchState, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    }));
  },
  getMetadata: function getMetadata(props, searchState) {
    var id = getId(props);
    var currentRefinement = getCurrentRefinement(props, searchState, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    });
    return {
      id: id,
      index: (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_0__.getIndexId)({
        ais: props.contextValue,
        multiIndexContext: props.indexContextValue
      }),
      items: currentRefinement === null ? [] : [{
        label: "".concat(id, ": ").concat(currentRefinement),
        value: function value(nextState) {
          return _refine(props, nextState, '', {
            ais: props.contextValue,
            multiIndexContext: props.indexContextValue
          });
        },
        currentRefinement: currentRefinement
      }]
    };
  }
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/connectors/connectStateResults.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/connectors/connectStateResults.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_createConnector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/createConnector.js */ "./node_modules/react-instantsearch-core/dist/es/core/createConnector.js");
/* harmony import */ var _core_indexUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/indexUtils.js */ "./node_modules/react-instantsearch-core/dist/es/core/indexUtils.js");



/**
 * The `connectStateResults` connector provides a way to access the `searchState` and the `searchResults`
 * of InstantSearch.
 * For instance this connector allows you to create results/noResults or query/noQuery pages.
 * @name connectStateResults
 * @kind connector
 * @providedPropType {object} searchState - The search state of the instant search component. <br/><br/> See: [Search state structure](https://community.algolia.com/react-instantsearch/guide/Search_state.html)
 * @providedPropType {object} searchResults - The search results. <br/><br/> In case of multiple indices: if used under `<Index>`, results will be those of the corresponding index otherwise it'll be those of the root index  See: [Search results structure](https://community.algolia.com/algoliasearch-helper-js/reference.html#searchresults)
 * @providedPropType {object} allSearchResults - In case of multiple indices you can retrieve all the results
 * @providedPropType {string} error - If the search failed, the error will be logged here.
 * @providedPropType {boolean} searching - If there is a search in progress.
 * @providedPropType {boolean} isSearchStalled - Flag that indicates if React InstantSearch has detected that searches are stalled.
 * @providedPropType {boolean} searchingForFacetValues - If there is a search in a list in progress.
 * @providedPropType {object} props - component props.
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, SearchBox, Hits, connectStateResults } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const Content = connectStateResults(({ searchState, searchResults }) => {
 *   const hasResults = searchResults && searchResults.nbHits !== 0;
 *
 *    return (
 *      <div>
 *        <div hidden={!hasResults}>
 *          <Hits />
 *        </div>
 *        <div hidden={hasResults}>
 *          <div>No results has been found for {searchState.query}</div>
 *        </div>
 *      </div>
 *    );
 * });
 *
 * const App = () => (
 *   <InstantSearch
 *      searchClient={searchClient}
 *      indexName="instant_search"
 *    >
 *      <SearchBox />
 *      <Content />
 *    </InstantSearch>
 * );
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_core_createConnector_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
  displayName: 'AlgoliaStateResults',
  $$type: 'ais.stateResults',
  getProvidedProps: function getProvidedProps(props, searchState, searchResults) {
    var results = (0,_core_indexUtils_js__WEBPACK_IMPORTED_MODULE_1__.getResults)(searchResults, {
      ais: props.contextValue,
      multiIndexContext: props.indexContextValue
    });
    return {
      searchState: searchState,
      searchResults: results,
      allSearchResults: searchResults.results,
      searching: searchResults.searching,
      isSearchStalled: searchResults.isSearchStalled,
      error: searchResults.error,
      searchingForFacetValues: searchResults.searchingForFacetValues,
      props: props
    };
  }
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/context.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/context.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IndexConsumer: () => (/* binding */ IndexConsumer),
/* harmony export */   IndexProvider: () => (/* binding */ IndexProvider),
/* harmony export */   InstantSearchConsumer: () => (/* binding */ InstantSearchConsumer),
/* harmony export */   InstantSearchProvider: () => (/* binding */ InstantSearchProvider),
/* harmony export */   instantSearchContext: () => (/* binding */ instantSearchContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var instantSearchContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  onInternalStateUpdate: function onInternalStateUpdate() {
    return undefined;
  },
  createHrefForState: function createHrefForState() {
    return '#';
  },
  onSearchForFacetValues: function onSearchForFacetValues() {
    return undefined;
  },
  onSearchStateChange: function onSearchStateChange() {
    return undefined;
  },
  onSearchParameters: function onSearchParameters() {
    return undefined;
  },
  store: {},
  widgetsManager: {},
  mainTargetedIndex: ''
});
var InstantSearchConsumer = instantSearchContext.Consumer,
  InstantSearchProvider = instantSearchContext.Provider;

var _createContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined),
  IndexConsumer = _createContext.Consumer,
  IndexProvider = _createContext.Provider;


/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/createConnector.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/createConnector.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createConnectorWithoutContext: () => (/* binding */ createConnectorWithoutContext),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-fast-compare */ "./node_modules/react-fast-compare/index.js");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./context.js */ "./node_modules/react-instantsearch-core/dist/es/core/context.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-instantsearch-core/dist/es/core/utils.js");
var _excluded = ["contextValue"];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




/**
 * Connectors are the HOC used to transform React components
 * into InstantSearch widgets.
 * In order to simplify the construction of such connectors
 * `createConnector` takes a description and transform it into
 * a connector.
 * @param {ConnectorDescription} connectorDesc the description of the connector
 * @return {Connector} a function that wraps a component into
 * an instantsearch connected one.
 */
function createConnectorWithoutContext(connectorDesc) {
  if (!connectorDesc.displayName) {
    throw new Error('`createConnector` requires you to provide a `displayName` property.');
  }
  var isWidget = typeof connectorDesc.getSearchParameters === 'function' || typeof connectorDesc.getMetadata === 'function' || typeof connectorDesc.transitionState === 'function';
  return function (Composed) {
    var additionalWidgetProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var Connector = /*#__PURE__*/function (_Component) {
      _inherits(Connector, _Component);
      var _super = _createSuper(Connector);
      function Connector(props) {
        var _this;
        _classCallCheck(this, Connector);
        _this = _super.call(this, props);
        _defineProperty(_assertThisInitialized(_this), "unsubscribe", void 0);
        _defineProperty(_assertThisInitialized(_this), "unregisterWidget", void 0);
        _defineProperty(_assertThisInitialized(_this), "cleanupTimerRef", null);
        _defineProperty(_assertThisInitialized(_this), "isUnmounting", false);
        _defineProperty(_assertThisInitialized(_this), "state", {
          providedProps: _this.getProvidedProps(_this.props)
        });
        _defineProperty(_assertThisInitialized(_this), "refine", function () {
          var _ref;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          _this.props.contextValue.onInternalStateUpdate(
          // refine will always be defined here because the prop is only given conditionally
          (_ref = connectorDesc.refine).call.apply(_ref, [_assertThisInitialized(_this), _this.props, _this.props.contextValue.store.getState().widgets].concat(args)));
        });
        _defineProperty(_assertThisInitialized(_this), "createURL", function () {
          var _ref2;
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          return _this.props.contextValue.createHrefForState(
          // refine will always be defined here because the prop is only given conditionally
          (_ref2 = connectorDesc.refine).call.apply(_ref2, [_assertThisInitialized(_this), _this.props, _this.props.contextValue.store.getState().widgets].concat(args)));
        });
        _defineProperty(_assertThisInitialized(_this), "searchForFacetValues", function () {
          var _ref3;
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          _this.props.contextValue.onSearchForFacetValues(
          // searchForFacetValues will always be defined here because the prop is only given conditionally
          (_ref3 = connectorDesc.searchForFacetValues).call.apply(_ref3, [_assertThisInitialized(_this), _this.props, _this.props.contextValue.store.getState().widgets].concat(args)));
        });
        if (connectorDesc.getSearchParameters) {
          _this.props.contextValue.onSearchParameters(connectorDesc.getSearchParameters.bind(_assertThisInitialized(_this)), {
            ais: _this.props.contextValue,
            multiIndexContext: _this.props.indexContextValue
          }, _this.props, connectorDesc.getMetadata && connectorDesc.getMetadata.bind(_assertThisInitialized(_this)), connectorDesc.displayName);
        }
        return _this;
      }
      _createClass(Connector, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          var _this2 = this;
          if (this.cleanupTimerRef) {
            clearTimeout(this.cleanupTimerRef);
            this.cleanupTimerRef = null;
          }
          this.unsubscribe = this.props.contextValue.store.subscribe(function () {
            if (!_this2.isUnmounting) {
              _this2.setState({
                providedProps: _this2.getProvidedProps(_this2.props)
              });
            }
          });
          if (isWidget) {
            this.unregisterWidget = this.props.contextValue.widgetsManager.registerWidget(this);
          }
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          if (typeof connectorDesc.shouldComponentUpdate === 'function') {
            return connectorDesc.shouldComponentUpdate.call(this, this.props, nextProps, this.state, nextState);
          }
          var propsEqual = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqual)(this.props, nextProps);
          if (this.state.providedProps === null || nextState.providedProps === null) {
            if (this.state.providedProps === nextState.providedProps) {
              return !propsEqual;
            }
            return true;
          }
          return !propsEqual || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqual)(this.state.providedProps, nextState.providedProps);
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
          if (!react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default()(prevProps, this.props)) {
            this.setState({
              providedProps: this.getProvidedProps(this.props)
            });
            if (isWidget) {
              this.props.contextValue.widgetsManager.update();
              if (typeof connectorDesc.transitionState === 'function') {
                this.props.contextValue.onSearchStateChange(connectorDesc.transitionState.call(this, this.props, this.props.contextValue.store.getState().widgets, this.props.contextValue.store.getState().widgets));
              }
            }
          }
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          var _this3 = this;
          this.cleanupTimerRef = setTimeout(function () {
            _this3.isUnmounting = true;
            if (_this3.unsubscribe) {
              _this3.unsubscribe();
            }
            if (_this3.unregisterWidget) {
              _this3.unregisterWidget();
              if (typeof connectorDesc.cleanUp === 'function') {
                var nextState = connectorDesc.cleanUp.call(_this3, _this3.props, _this3.props.contextValue.store.getState().widgets);
                _this3.props.contextValue.store.setState(_objectSpread(_objectSpread({}, _this3.props.contextValue.store.getState()), {}, {
                  widgets: nextState
                }));
                _this3.props.contextValue.onSearchStateChange((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.removeEmptyKey)(nextState));
              }
            }
          });
        }
      }, {
        key: "getProvidedProps",
        value: function getProvidedProps(props) {
          var _this$props$contextVa = this.props.contextValue.store.getState(),
            widgets = _this$props$contextVa.widgets,
            results = _this$props$contextVa.results,
            resultsFacetValues = _this$props$contextVa.resultsFacetValues,
            searching = _this$props$contextVa.searching,
            searchingForFacetValues = _this$props$contextVa.searchingForFacetValues,
            isSearchStalled = _this$props$contextVa.isSearchStalled,
            metadata = _this$props$contextVa.metadata,
            error = _this$props$contextVa.error;
          var searchResults = {
            results: results,
            searching: searching,
            searchingForFacetValues: searchingForFacetValues,
            isSearchStalled: isSearchStalled,
            error: error
          };
          return connectorDesc.getProvidedProps.call(this, props, widgets, searchResults, metadata,
          // @MAJOR: move this attribute on the `searchResults` it doesn't
          // makes sense to have it into a separate argument. The search
          // flags are on the object why not the results?
          resultsFacetValues);
        }
      }, {
        key: "getSearchParameters",
        value: function getSearchParameters(searchParameters) {
          if (typeof connectorDesc.getSearchParameters === 'function') {
            return connectorDesc.getSearchParameters.call(this, searchParameters, this.props, this.props.contextValue.store.getState().widgets);
          }
          return null;
        }
      }, {
        key: "getMetadata",
        value: function getMetadata(nextWidgetsState) {
          if (typeof connectorDesc.getMetadata === 'function') {
            return connectorDesc.getMetadata.call(this, this.props, nextWidgetsState);
          }
          return {};
        }
      }, {
        key: "transitionState",
        value: function transitionState(prevWidgetsState, nextWidgetsState) {
          if (typeof connectorDesc.transitionState === 'function') {
            return connectorDesc.transitionState.call(this, this.props, prevWidgetsState, nextWidgetsState);
          }
          return nextWidgetsState;
        }
      }, {
        key: "render",
        value: function render() {
          var _this$props = this.props,
            contextValue = _this$props.contextValue,
            props = _objectWithoutProperties(_this$props, _excluded);
          var providedProps = this.state.providedProps;
          if (providedProps === null) {
            return null;
          }
          var refineProps = typeof connectorDesc.refine === 'function' ? {
            refine: this.refine,
            createURL: this.createURL
          } : {};
          var searchForFacetValuesProps = typeof connectorDesc.searchForFacetValues === 'function' ? {
            searchForItems: this.searchForFacetValues
          } : {};
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Composed, _extends({}, props, providedProps, refineProps, searchForFacetValuesProps));
        }
      }]);
      return Connector;
    }(react__WEBPACK_IMPORTED_MODULE_0__.Component);
    _defineProperty(Connector, "displayName", "".concat(connectorDesc.displayName, "(").concat((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.getDisplayName)(Composed), ")"));
    _defineProperty(Connector, "$$type", connectorDesc.$$type);
    _defineProperty(Connector, "$$widgetType", additionalWidgetProperties.$$widgetType);
    _defineProperty(Connector, "propTypes", connectorDesc.propTypes);
    _defineProperty(Connector, "defaultProps", connectorDesc.defaultProps);
    _defineProperty(Connector, "_connectorDesc", connectorDesc);
    return Connector;
  };
}
var createConnectorWithContext = function createConnectorWithContext(connectorDesc) {
  return function (Composed, additionalWidgetProperties) {
    var Connector = createConnectorWithoutContext(connectorDesc)(Composed, additionalWidgetProperties);
    var ConnectorWrapper = function ConnectorWrapper(props) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context_js__WEBPACK_IMPORTED_MODULE_3__.InstantSearchConsumer, null, function (contextValue) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_context_js__WEBPACK_IMPORTED_MODULE_3__.IndexConsumer, null, function (indexContextValue) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Connector, _extends({
            contextValue: contextValue,
            indexContextValue: indexContextValue
          }, props));
        });
      });
    };
    return ConnectorWrapper;
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createConnectorWithContext);

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/createInstantSearchManager.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/createInstantSearchManager.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createInstantSearchManager)
/* harmony export */ });
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! algoliasearch-helper */ "./node_modules/algoliasearch-helper/index.js");
/* harmony import */ var algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _createStore_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./createStore.js */ "./node_modules/react-instantsearch-core/dist/es/core/createStore.js");
/* harmony import */ var _createWidgetsManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createWidgetsManager.js */ "./node_modules/react-instantsearch-core/dist/es/core/createWidgetsManager.js");
/* harmony import */ var _highlight_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./highlight.js */ "./node_modules/react-instantsearch-core/dist/es/core/highlight.js");
/* harmony import */ var _indexUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./indexUtils.js */ "./node_modules/react-instantsearch-core/dist/es/core/indexUtils.js");
/* harmony import */ var _version_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./version.js */ "./node_modules/react-instantsearch-core/dist/es/core/version.js");
var _excluded = ["resultsFacetValues"],
  _excluded2 = ["resultsFacetValues"],
  _excluded3 = ["resultsFacetValues"];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }







function addAlgoliaAgents(searchClient) {
  if (typeof searchClient.addAlgoliaAgent === 'function') {
    searchClient.addAlgoliaAgent("react (".concat(react__WEBPACK_IMPORTED_MODULE_1__.version, ")"));
    searchClient.addAlgoliaAgent("react-instantsearch (".concat(_version_js__WEBPACK_IMPORTED_MODULE_2__["default"], ")"));
  }
}
var isMultiIndexContext = function isMultiIndexContext(widget) {
  return (0,_indexUtils_js__WEBPACK_IMPORTED_MODULE_3__.hasMultipleIndices)({
    ais: widget.props.contextValue,
    multiIndexContext: widget.props.indexContextValue
  });
};
var isTargetedIndexEqualIndex = function isTargetedIndexEqualIndex(widget, indexId) {
  return widget.props.indexContextValue.targetedIndex === indexId;
};

// Relying on the `indexId` is a bit brittle to detect the `Index` widget.
// Since it's a class we could rely on `instanceof` or similar. We never
// had an issue though. Works for now.
var isIndexWidget = function isIndexWidget(widget) {
  return Boolean(widget.props.indexId);
};
var isIndexWidgetEqualIndex = function isIndexWidgetEqualIndex(widget, indexId) {
  return widget.props.indexId === indexId;
};
var sortIndexWidgetsFirst = function sortIndexWidgetsFirst(firstWidget, secondWidget) {
  var isFirstWidgetIndex = isIndexWidget(firstWidget);
  var isSecondWidgetIndex = isIndexWidget(secondWidget);
  if (isFirstWidgetIndex && !isSecondWidgetIndex) {
    return -1;
  }
  if (!isFirstWidgetIndex && isSecondWidgetIndex) {
    return 1;
  }
  return 0;
};

// This function is copied from the algoliasearch v4 API Client. If modified,
// consider updating it also in `serializeQueryParameters` from `@algolia/transporter`.
function serializeQueryParameters(parameters) {
  var isObjectOrArray = function isObjectOrArray(value) {
    return Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]';
  };
  var encode = function encode(format) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    var i = 0;
    return format.replace(/%s/g, function () {
      return encodeURIComponent(args[i++]);
    });
  };
  return Object.keys(parameters).map(function (key) {
    return encode('%s=%s', key, isObjectOrArray(parameters[key]) ? JSON.stringify(parameters[key]) : parameters[key]);
  }).join('&');
}

/**
 * Creates a new instance of the InstantSearchManager which controls the widgets and
 * trigger the search when the widgets are updated.
 * @param {string} indexName - the main index name
 * @param {object} initialState - initial widget state
 * @param {object} SearchParameters - optional additional parameters to send to the algolia API
 * @param {number} stalledSearchDelay - time (in ms) after the search is stalled
 * @return {InstantSearchManager} a new instance of InstantSearchManager
 */
function createInstantSearchManager(_ref) {
  var indexName = _ref.indexName,
    _ref$initialState = _ref.initialState,
    initialState = _ref$initialState === void 0 ? {} : _ref$initialState,
    searchClient = _ref.searchClient,
    resultsState = _ref.resultsState,
    stalledSearchDelay = _ref.stalledSearchDelay;
  var helper = algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default()(searchClient, indexName, _objectSpread({}, _highlight_js__WEBPACK_IMPORTED_MODULE_4__.HIGHLIGHT_TAGS));
  addAlgoliaAgents(searchClient);
  helper.on('search', handleNewSearch).on('result', handleSearchSuccess({
    indexId: indexName
  })).on('error', handleSearchError);
  var skip = false;
  var stalledSearchTimer = null;
  var initialSearchParameters = helper.state;
  var searchCounter;
  var widgetsManager = (0,_createWidgetsManager_js__WEBPACK_IMPORTED_MODULE_5__["default"])(onWidgetsUpdate);
  hydrateSearchClient(searchClient, resultsState);
  var store = (0,_createStore_js__WEBPACK_IMPORTED_MODULE_6__["default"])({
    widgets: initialState,
    metadata: hydrateMetadata(resultsState),
    results: hydrateResultsState(resultsState),
    error: null,
    searching: false,
    isSearchStalled: true,
    searchingForFacetValues: false
  });
  function skipSearch() {
    skip = true;
  }
  function updateClient(client) {
    addAlgoliaAgents(client);
    helper.setClient(client);
    search();
  }
  function clearCache() {
    helper.clearCache();
    search();
  }
  function getMetadata(state) {
    return widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getMetadata);
    }).map(function (widget) {
      return widget.getMetadata(state);
    });
  }
  function getSearchParameters() {
    var sharedParameters = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      return !isMultiIndexContext(widget) && !isIndexWidget(widget);
    }).reduce(function (res, widget) {
      return widget.getSearchParameters(res);
    }, initialSearchParameters);
    var mainParameters = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      var targetedIndexEqualMainIndex = isMultiIndexContext(widget) && isTargetedIndexEqualIndex(widget, indexName);
      var subIndexEqualMainIndex = isIndexWidget(widget) && isIndexWidgetEqualIndex(widget, indexName);
      return targetedIndexEqualMainIndex || subIndexEqualMainIndex;
    })
    // We have to sort the `Index` widgets first so the `index` parameter
    // is correctly set in the `reduce` function for the following widgets
    .sort(sortIndexWidgetsFirst).reduce(function (res, widget) {
      return widget.getSearchParameters(res);
    }, sharedParameters);
    var derivedIndices = widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.getSearchParameters);
    }).filter(function (widget) {
      var targetedIndexNotEqualMainIndex = isMultiIndexContext(widget) && !isTargetedIndexEqualIndex(widget, indexName);
      var subIndexNotEqualMainIndex = isIndexWidget(widget) && !isIndexWidgetEqualIndex(widget, indexName);
      return targetedIndexNotEqualMainIndex || subIndexNotEqualMainIndex;
    })
    // We have to sort the `Index` widgets first so the `index` parameter
    // is correctly set in the `reduce` function for the following widgets
    .sort(sortIndexWidgetsFirst).reduce(function (indices, widget) {
      var indexId = isMultiIndexContext(widget) ? widget.props.indexContextValue.targetedIndex : widget.props.indexId;
      var widgets = indices[indexId] || [];
      return _objectSpread(_objectSpread({}, indices), {}, _defineProperty({}, indexId, widgets.concat(widget)));
    }, {});
    var derivedParameters = Object.keys(derivedIndices).map(function (indexId) {
      return {
        parameters: derivedIndices[indexId].reduce(function (res, widget) {
          return widget.getSearchParameters(res);
        }, sharedParameters),
        indexId: indexId
      };
    });
    return {
      mainParameters: mainParameters,
      derivedParameters: derivedParameters
    };
  }
  function search() {
    if (!skip) {
      var _getSearchParameters = getSearchParameters(helper.state),
        mainParameters = _getSearchParameters.mainParameters,
        derivedParameters = _getSearchParameters.derivedParameters;
      searchCounter = derivedParameters.length + 1;

      // We have to call `slice` because the method `detach` on the derived
      // helpers mutates the value `derivedHelpers`. The `forEach` loop does
      // not iterate on each value and we're not able to correctly clear the
      // previous derived helpers (memory leak + useless requests).
      helper.derivedHelpers.slice().forEach(function (derivedHelper) {
        // Since we detach the derived helpers on **every** new search they
        // won't receive intermediate results in case of a stalled search.
        // Only the last result is dispatched by the derived helper because
        // they are not detached yet:
        //
        // - a -> main helper receives results
        // - ap -> main helper receives results
        // - app -> main helper + derived helpers receive results
        //
        // The quick fix is to avoid to detach them on search but only once they
        // received the results. But it means that in case of a stalled search
        // all the derived helpers not detached yet register a new search inside
        // the helper. The number grows fast in case of a bad network and it's
        // not deterministic.
        derivedHelper.detach();
      });
      derivedParameters.forEach(function (_ref2) {
        var indexId = _ref2.indexId,
          parameters = _ref2.parameters;
        var derivedHelper = helper.derive(function () {
          return parameters;
        });
        derivedHelper.on('result', handleSearchSuccess({
          indexId: indexId
        })).on('error', handleSearchError);
      });
      helper.setState(mainParameters);
      helper.search();
    }
  }
  function handleSearchSuccess(_ref3) {
    var indexId = _ref3.indexId;
    return function (event) {
      searchCounter--;
      var state = store.getState();
      var isDerivedHelpersEmpty = !helper.derivedHelpers.length;
      var results = state.results ? state.results : {};

      // Switching from mono index to multi index and vice versa must reset the
      // results to an empty object, otherwise we keep reference of stalled and
      // unused results.
      results = !isDerivedHelpersEmpty && results.getFacetByName ? {} : results;
      if (!isDerivedHelpersEmpty) {
        results = _objectSpread(_objectSpread({}, results), {}, _defineProperty({}, indexId, event.results));
      } else {
        results = event.results;
      }
      var currentState = store.getState();
      var nextIsSearchStalled = currentState.isSearchStalled;
      if (!helper.hasPendingRequests()) {
        clearTimeout(stalledSearchTimer);
        stalledSearchTimer = null;
        nextIsSearchStalled = false;
      }
      var resultsFacetValues = currentState.resultsFacetValues,
        partialState = _objectWithoutProperties(currentState, _excluded);
      store.setState(_objectSpread(_objectSpread({}, partialState), {}, {
        results: results,
        isSearchStalled: nextIsSearchStalled,
        searching: searchCounter > 0,
        error: null
      }));
    };
  }
  function handleSearchError(_ref4) {
    var error = _ref4.error;
    var currentState = store.getState();
    var nextIsSearchStalled = currentState.isSearchStalled;
    if (!helper.hasPendingRequests()) {
      clearTimeout(stalledSearchTimer);
      nextIsSearchStalled = false;
    }
    var resultsFacetValues = currentState.resultsFacetValues,
      partialState = _objectWithoutProperties(currentState, _excluded2);
    store.setState(_objectSpread(_objectSpread({}, partialState), {}, {
      isSearchStalled: nextIsSearchStalled,
      error: error,
      searching: false
    }));
  }
  function handleNewSearch() {
    if (!stalledSearchTimer) {
      stalledSearchTimer = setTimeout(function () {
        var _store$getState = store.getState(),
          resultsFacetValues = _store$getState.resultsFacetValues,
          partialState = _objectWithoutProperties(_store$getState, _excluded3);
        store.setState(_objectSpread(_objectSpread({}, partialState), {}, {
          isSearchStalled: true
        }));
      }, stalledSearchDelay);
    }
  }
  function hydrateSearchClient(client, results) {
    if (!results) {
      return;
    }

    // Disable cache hydration on:
    // - Algoliasearch API Client < v4 with cache disabled
    // - Third party clients (detected by the `addAlgoliaAgent` function missing)

    if ((!client.transporter || client._cacheHydrated) && (!client._useCache || typeof client.addAlgoliaAgent !== 'function')) {
      return;
    }

    // Algoliasearch API Client >= v4
    // To hydrate the client we need to populate the cache with the data from
    // the server (done in `hydrateSearchClientWithMultiIndexRequest` or
    // `hydrateSearchClientWithSingleIndexRequest`). But since there is no way
    // for us to compute the key the same way as `algoliasearch-client` we need
    // to populate it on a custom key and override the `search` method to
    // search on it first.
    if (client.transporter && !client._cacheHydrated) {
      client._cacheHydrated = true;
      var baseMethod = client.search;
      client.search = function (requests) {
        for (var _len2 = arguments.length, methodArgs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          methodArgs[_key2 - 1] = arguments[_key2];
        }
        var requestsWithSerializedParams = requests.map(function (request) {
          return _objectSpread(_objectSpread({}, request), {}, {
            params: serializeQueryParameters(request.params)
          });
        });
        return client.transporter.responsesCache.get({
          method: 'search',
          args: [requestsWithSerializedParams].concat(methodArgs)
        }, function () {
          return baseMethod.apply(void 0, [requests].concat(methodArgs));
        });
      };
    }
    if (Array.isArray(results.results)) {
      hydrateSearchClientWithMultiIndexRequest(client, results.results);
      return;
    }
    hydrateSearchClientWithSingleIndexRequest(client, results);
  }
  function hydrateSearchClientWithMultiIndexRequest(client, results) {
    // Algoliasearch API Client >= v4
    // Populate the cache with the data from the server
    if (client.transporter) {
      client.transporter.responsesCache.set({
        method: 'search',
        args: [results.reduce(function (acc, result) {
          return acc.concat(result.rawResults.map(function (request) {
            return {
              indexName: request.index,
              params: request.params
            };
          }));
        }, [])]
      }, {
        results: results.reduce(function (acc, result) {
          return acc.concat(result.rawResults);
        }, [])
      });
      return;
    }

    // Algoliasearch API Client < v4
    // Prior to client v4 we didn't have a proper API to hydrate the client
    // cache from the outside. The following code populates the cache with
    // a single-index result. You can find more information about the
    // computation of the key inside the client (see link below).
    // https://github.com/algolia/algoliasearch-client-javascript/blob/c27e89ff92b2a854ae6f40dc524bffe0f0cbc169/src/AlgoliaSearchCore.js#L232-L240
    var key = "/1/indexes/*/queries_body_".concat(JSON.stringify({
      requests: results.reduce(function (acc, result) {
        return acc.concat(result.rawResults.map(function (request) {
          return {
            indexName: request.index,
            params: request.params
          };
        }));
      }, [])
    }));
    client.cache = _objectSpread(_objectSpread({}, client.cache), {}, _defineProperty({}, key, JSON.stringify({
      results: results.reduce(function (acc, result) {
        return acc.concat(result.rawResults);
      }, [])
    })));
  }
  function hydrateSearchClientWithSingleIndexRequest(client, results) {
    // Algoliasearch API Client >= v4
    // Populate the cache with the data from the server
    if (client.transporter) {
      client.transporter.responsesCache.set({
        method: 'search',
        args: [results.rawResults.map(function (request) {
          return {
            indexName: request.index,
            params: request.params
          };
        })]
      }, {
        results: results.rawResults
      });
      return;
    }
    // Algoliasearch API Client < v4
    // Prior to client v4 we didn't have a proper API to hydrate the client
    // cache from the outside. The following code populates the cache with
    // a single-index result. You can find more information about the
    // computation of the key inside the client (see link below).
    // https://github.com/algolia/algoliasearch-client-javascript/blob/c27e89ff92b2a854ae6f40dc524bffe0f0cbc169/src/AlgoliaSearchCore.js#L232-L240
    var key = "/1/indexes/*/queries_body_".concat(JSON.stringify({
      requests: results.rawResults.map(function (request) {
        return {
          indexName: request.index,
          params: request.params
        };
      })
    }));
    client.cache = _objectSpread(_objectSpread({}, client.cache), {}, _defineProperty({}, key, JSON.stringify({
      results: results.rawResults
    })));
  }
  function hydrateResultsState(results) {
    if (!results) {
      return null;
    }
    if (Array.isArray(results.results)) {
      return results.results.reduce(function (acc, result) {
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, result._internalIndexId, new (algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default().SearchResults)(new (algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default().SearchParameters)(result.state), result.rawResults)));
      }, {});
    }
    return new (algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default().SearchResults)(new (algoliasearch_helper__WEBPACK_IMPORTED_MODULE_0___default().SearchParameters)(results.state), results.rawResults);
  }

  // Called whenever a widget has been rendered with new props.
  function onWidgetsUpdate() {
    var metadata = getMetadata(store.getState().widgets);
    store.setState(_objectSpread(_objectSpread({}, store.getState()), {}, {
      metadata: metadata,
      searching: true
    }));

    // Since the `getSearchParameters` method of widgets also depends on props,
    // the result search parameters might have changed.
    search();
  }
  function transitionState(nextSearchState) {
    var searchState = store.getState().widgets;
    return widgetsManager.getWidgets().filter(function (widget) {
      return Boolean(widget.transitionState);
    }).reduce(function (res, widget) {
      return widget.transitionState(searchState, res);
    }, nextSearchState);
  }
  function onExternalStateUpdate(nextSearchState) {
    var metadata = getMetadata(nextSearchState);
    store.setState(_objectSpread(_objectSpread({}, store.getState()), {}, {
      widgets: nextSearchState,
      metadata: metadata,
      searching: true
    }));
    search();
  }
  function onSearchForFacetValues(_ref5) {
    var facetName = _ref5.facetName,
      query = _ref5.query,
      _ref5$maxFacetHits = _ref5.maxFacetHits,
      maxFacetHits = _ref5$maxFacetHits === void 0 ? 10 : _ref5$maxFacetHits;
    // The values 1, 100 are the min / max values that the engine accepts.
    // see: https://www.algolia.com/doc/api-reference/api-parameters/maxFacetHits
    var maxFacetHitsWithinRange = Math.max(1, Math.min(maxFacetHits, 100));
    store.setState(_objectSpread(_objectSpread({}, store.getState()), {}, {
      searchingForFacetValues: true
    }));
    helper.searchForFacetValues(facetName, query, maxFacetHitsWithinRange).then(function (content) {
      var _objectSpread7;
      store.setState(_objectSpread(_objectSpread({}, store.getState()), {}, {
        error: null,
        searchingForFacetValues: false,
        resultsFacetValues: _objectSpread(_objectSpread({}, store.getState().resultsFacetValues), {}, (_objectSpread7 = {}, _defineProperty(_objectSpread7, facetName, content.facetHits), _defineProperty(_objectSpread7, "query", query), _objectSpread7))
      }));
    }, function (error) {
      store.setState(_objectSpread(_objectSpread({}, store.getState()), {}, {
        searchingForFacetValues: false,
        error: error
      }));
    }).catch(function (error) {
      // Since setState is synchronous, any error that occurs in the render of a
      // component will be swallowed by this promise.
      // This is a trick to make the error show up correctly in the console.
      // See http://stackoverflow.com/a/30741722/969302
      setTimeout(function () {
        throw error;
      });
    });
  }
  function updateIndex(newIndex) {
    initialSearchParameters = initialSearchParameters.setIndex(newIndex);
    // No need to trigger a new search here as the widgets will also update and trigger it if needed.
  }

  function getWidgetsIds() {
    return store.getState().metadata.reduce(function (res, meta) {
      return typeof meta.id !== 'undefined' ? res.concat(meta.id) : res;
    }, []);
  }
  return {
    store: store,
    widgetsManager: widgetsManager,
    getWidgetsIds: getWidgetsIds,
    getSearchParameters: getSearchParameters,
    onSearchForFacetValues: onSearchForFacetValues,
    onExternalStateUpdate: onExternalStateUpdate,
    transitionState: transitionState,
    updateClient: updateClient,
    updateIndex: updateIndex,
    clearCache: clearCache,
    skipSearch: skipSearch
  };
}
function hydrateMetadata(resultsState) {
  if (!resultsState) {
    return [];
  }

  // add a value noop, which gets replaced once the widgets are mounted
  return resultsState.metadata.map(function (datum) {
    return _objectSpread(_objectSpread({
      value: function value() {
        return {};
      }
    }, datum), {}, {
      items: datum.items && datum.items.map(function (item) {
        return _objectSpread(_objectSpread({
          value: function value() {
            return {};
          }
        }, item), {}, {
          items: item.items && item.items.map(function (nestedItem) {
            return _objectSpread({
              value: function value() {
                return {};
              }
            }, nestedItem);
          })
        });
      })
    });
  });
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/createStore.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/createStore.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createStore)
/* harmony export */ });
function createStore(initialState) {
  var state = initialState;
  var listeners = [];
  return {
    getState: function getState() {
      return state;
    },
    setState: function setState(nextState) {
      state = nextState;
      listeners.forEach(function (listener) {
        return listener();
      });
    },
    subscribe: function subscribe(listener) {
      listeners.push(listener);
      return function unsubscribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    }
  };
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/createWidgetsManager.js":
/*!************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/createWidgetsManager.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createWidgetsManager)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-instantsearch-core/dist/es/core/utils.js");

function createWidgetsManager(onWidgetsUpdate) {
  var widgets = [];
  // Is an update scheduled?
  var scheduled = false;

  // The state manager's updates need to be batched since more than one
  // component can register or unregister widgets during the same tick.
  function scheduleUpdate() {
    if (scheduled) {
      return;
    }
    scheduled = true;
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.defer)(function () {
      scheduled = false;
      onWidgetsUpdate();
    });
  }
  return {
    registerWidget: function registerWidget(widget) {
      widgets.push(widget);
      scheduleUpdate();
      return function unregisterWidget() {
        widgets.splice(widgets.indexOf(widget), 1);
        scheduleUpdate();
      };
    },
    update: scheduleUpdate,
    getWidgets: function getWidgets() {
      return widgets;
    }
  };
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/highlight.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/highlight.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HIGHLIGHT_TAGS: () => (/* binding */ HIGHLIGHT_TAGS),
/* harmony export */   parseAlgoliaHit: () => (/* binding */ parseAlgoliaHit)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-instantsearch-core/dist/es/core/utils.js");

var HIGHLIGHT_TAGS = {
  highlightPreTag: "<ais-highlight-0000000000>",
  highlightPostTag: "</ais-highlight-0000000000>"
};

/**
 * Parses an highlighted attribute into an array of objects with the string value, and
 * a boolean that indicated if this part is highlighted.
 *
 * @param {string} preTag - string used to identify the start of an highlighted value
 * @param {string} postTag - string used to identify the end of an highlighted value
 * @param {string} highlightedValue - highlighted attribute as returned by Algolia highlight feature
 * @return {object[]} - An array of {value: string, isHighlighted: boolean}.
 */
function parseHighlightedAttribute(_ref) {
  var preTag = _ref.preTag,
    postTag = _ref.postTag,
    _ref$highlightedValue = _ref.highlightedValue,
    highlightedValue = _ref$highlightedValue === void 0 ? '' : _ref$highlightedValue;
  var splitByPreTag = highlightedValue.split(preTag);
  var firstValue = splitByPreTag.shift();
  var elements = firstValue === '' ? [] : [{
    value: firstValue,
    isHighlighted: false
  }];
  if (postTag === preTag) {
    var isHighlighted = true;
    splitByPreTag.forEach(function (split) {
      elements.push({
        value: split,
        isHighlighted: isHighlighted
      });
      isHighlighted = !isHighlighted;
    });
  } else {
    splitByPreTag.forEach(function (split) {
      var splitByPostTag = split.split(postTag);
      elements.push({
        value: splitByPostTag[0],
        isHighlighted: true
      });
      if (splitByPostTag[1] !== '') {
        elements.push({
          value: splitByPostTag[1],
          isHighlighted: false
        });
      }
    });
  }
  return elements;
}

/**
 * Find an highlighted attribute given an `attribute` and an `highlightProperty`, parses it,
 * and provided an array of objects with the string value and a boolean if this
 * value is highlighted.
 *
 * In order to use this feature, highlight must be activated in the configuration of
 * the index. The `preTag` and `postTag` attributes are respectively highlightPreTag and
 * highlightPostTag in Algolia configuration.
 *
 * @param {string} preTag - string used to identify the start of an highlighted value
 * @param {string} postTag - string used to identify the end of an highlighted value
 * @param {string} highlightProperty - the property that contains the highlight structure in the results
 * @param {string} attribute - the highlighted attribute to look for
 * @param {object} hit - the actual hit returned by Algolia.
 * @return {object[]} - An array of {value: string, isHighlighted: boolean}.
 */
function parseAlgoliaHit(_ref2) {
  var _ref2$preTag = _ref2.preTag,
    preTag = _ref2$preTag === void 0 ? '<em>' : _ref2$preTag,
    _ref2$postTag = _ref2.postTag,
    postTag = _ref2$postTag === void 0 ? '</em>' : _ref2$postTag,
    highlightProperty = _ref2.highlightProperty,
    attribute = _ref2.attribute,
    hit = _ref2.hit;
  if (!hit) throw new Error('`hit`, the matching record, must be provided');
  var highlightObject = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getPropertyByPath)(hit[highlightProperty], attribute) || {};
  if (Array.isArray(highlightObject)) {
    return highlightObject.map(function (item) {
      return parseHighlightedAttribute({
        preTag: preTag,
        postTag: postTag,
        highlightedValue: item.value
      });
    });
  }
  return parseHighlightedAttribute({
    preTag: preTag,
    postTag: postTag,
    highlightedValue: highlightObject.value
  });
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/indexUtils.js":
/*!**************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/indexUtils.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cleanUpValue: () => (/* binding */ cleanUpValue),
/* harmony export */   getCurrentRefinementValue: () => (/* binding */ getCurrentRefinementValue),
/* harmony export */   getIndexId: () => (/* binding */ getIndexId),
/* harmony export */   getResults: () => (/* binding */ getResults),
/* harmony export */   hasMultipleIndices: () => (/* binding */ hasMultipleIndices),
/* harmony export */   refineValue: () => (/* binding */ refineValue)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/react-instantsearch-core/dist/es/core/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function getIndexId(context) {
  return hasMultipleIndices(context) ? context.multiIndexContext.targetedIndex : context.ais.mainTargetedIndex;
}

// eslint-disable-next-line valid-jsdoc
/**
 * @returns {import('algoliasearch-helper').SearchResults} results
 */
function getResults(searchResults, context) {
  if (searchResults.results) {
    if (searchResults.results.hits) {
      return searchResults.results;
    }
    var indexId = getIndexId(context);
    if (searchResults.results[indexId]) {
      return searchResults.results[indexId];
    }
  }
  return null;
}
function hasMultipleIndices(context) {
  return context && context.multiIndexContext;
}
function refineValue(searchState, nextRefinement, context, resetPage, namespace) {
  if (hasMultipleIndices(context)) {
    var indexId = getIndexId(context);
    return namespace ? refineMultiIndexWithNamespace(searchState, nextRefinement, indexId, resetPage, namespace) : refineMultiIndex(searchState, nextRefinement, indexId, resetPage);
  } else {
    // When we have a multi index page with shared widgets we should also
    // reset their page to 1 if the resetPage is provided. Otherwise the
    // indices will always be reset
    // see: https://github.com/algolia/react-instantsearch/issues/310
    // see: https://github.com/algolia/react-instantsearch/issues/637
    if (searchState.indices && resetPage) {
      Object.keys(searchState.indices).forEach(function (targetedIndex) {
        searchState = refineValue(searchState, {
          page: 1
        }, {
          multiIndexContext: {
            targetedIndex: targetedIndex
          }
        }, true, namespace);
      });
    }
    return namespace ? refineSingleIndexWithNamespace(searchState, nextRefinement, resetPage, namespace) : refineSingleIndex(searchState, nextRefinement, resetPage);
  }
}
function refineMultiIndex(searchState, nextRefinement, indexId, resetPage) {
  var page = resetPage ? {
    page: 1
  } : undefined;
  var state = searchState.indices && searchState.indices[indexId] ? _objectSpread(_objectSpread({}, searchState.indices), {}, _defineProperty({}, indexId, _objectSpread(_objectSpread(_objectSpread({}, searchState.indices[indexId]), nextRefinement), page))) : _objectSpread(_objectSpread({}, searchState.indices), {}, _defineProperty({}, indexId, _objectSpread(_objectSpread({}, nextRefinement), page)));
  return _objectSpread(_objectSpread({}, searchState), {}, {
    indices: state
  });
}
function refineSingleIndex(searchState, nextRefinement, resetPage) {
  var page = resetPage ? {
    page: 1
  } : undefined;
  return _objectSpread(_objectSpread(_objectSpread({}, searchState), nextRefinement), page);
}
function refineMultiIndexWithNamespace(searchState, nextRefinement, indexId, resetPage, namespace) {
  var _objectSpread4;
  var page = resetPage ? {
    page: 1
  } : undefined;
  var state = searchState.indices && searchState.indices[indexId] ? _objectSpread(_objectSpread({}, searchState.indices), {}, _defineProperty({}, indexId, _objectSpread(_objectSpread({}, searchState.indices[indexId]), {}, (_objectSpread4 = {}, _defineProperty(_objectSpread4, namespace, _objectSpread(_objectSpread({}, searchState.indices[indexId][namespace]), nextRefinement)), _defineProperty(_objectSpread4, "page", 1), _objectSpread4)))) : _objectSpread(_objectSpread({}, searchState.indices), {}, _defineProperty({}, indexId, _objectSpread(_defineProperty({}, namespace, nextRefinement), page)));
  return _objectSpread(_objectSpread({}, searchState), {}, {
    indices: state
  });
}
function refineSingleIndexWithNamespace(searchState, nextRefinement, resetPage, namespace) {
  var page = resetPage ? {
    page: 1
  } : undefined;
  return _objectSpread(_objectSpread({}, searchState), {}, _defineProperty({}, namespace, _objectSpread(_objectSpread({}, searchState[namespace]), nextRefinement)), page);
}
function getNamespaceAndAttributeName(id) {
  var parts = id.match(/^([^.]*)\.(.*)/);
  var namespace = parts && parts[1];
  var attributeName = parts && parts[2];
  return {
    namespace: namespace,
    attributeName: attributeName
  };
}
function hasRefinements(_ref) {
  var multiIndex = _ref.multiIndex,
    indexId = _ref.indexId,
    namespace = _ref.namespace,
    attributeName = _ref.attributeName,
    id = _ref.id,
    searchState = _ref.searchState;
  if (multiIndex && namespace) {
    return searchState.indices && searchState.indices[indexId] && searchState.indices[indexId][namespace] && Object.hasOwnProperty.call(searchState.indices[indexId][namespace], attributeName);
  }
  if (multiIndex) {
    return searchState.indices && searchState.indices[indexId] && Object.hasOwnProperty.call(searchState.indices[indexId], id);
  }
  if (namespace) {
    return searchState[namespace] && Object.hasOwnProperty.call(searchState[namespace], attributeName);
  }
  return Object.hasOwnProperty.call(searchState, id);
}
function getRefinements(_ref2) {
  var multiIndex = _ref2.multiIndex,
    indexId = _ref2.indexId,
    namespace = _ref2.namespace,
    attributeName = _ref2.attributeName,
    id = _ref2.id,
    searchState = _ref2.searchState;
  if (multiIndex && namespace) {
    return searchState.indices[indexId][namespace][attributeName];
  }
  if (multiIndex) {
    return searchState.indices[indexId][id];
  }
  if (namespace) {
    return searchState[namespace][attributeName];
  }
  return searchState[id];
}
function getCurrentRefinementValue(props, searchState, context, id, defaultValue) {
  var indexId = getIndexId(context);
  var _getNamespaceAndAttri = getNamespaceAndAttributeName(id),
    namespace = _getNamespaceAndAttri.namespace,
    attributeName = _getNamespaceAndAttri.attributeName;
  var multiIndex = hasMultipleIndices(context);
  var args = {
    multiIndex: multiIndex,
    indexId: indexId,
    namespace: namespace,
    attributeName: attributeName,
    id: id,
    searchState: searchState
  };
  var hasRefinementsValue = hasRefinements(args);
  if (hasRefinementsValue) {
    return getRefinements(args);
  }
  if (props.defaultRefinement) {
    return props.defaultRefinement;
  }
  return defaultValue;
}
function cleanUpValue(searchState, context, id) {
  var indexId = getIndexId(context);
  var _getNamespaceAndAttri2 = getNamespaceAndAttributeName(id),
    namespace = _getNamespaceAndAttri2.namespace,
    attributeName = _getNamespaceAndAttri2.attributeName;
  if (hasMultipleIndices(context) && Boolean(searchState.indices)) {
    return cleanUpValueWithMultiIndex({
      attribute: attributeName,
      searchState: searchState,
      indexId: indexId,
      id: id,
      namespace: namespace
    });
  }
  return cleanUpValueWithSingleIndex({
    attribute: attributeName,
    searchState: searchState,
    id: id,
    namespace: namespace
  });
}
function cleanUpValueWithSingleIndex(_ref3) {
  var searchState = _ref3.searchState,
    id = _ref3.id,
    namespace = _ref3.namespace,
    attribute = _ref3.attribute;
  if (namespace) {
    return _objectSpread(_objectSpread({}, searchState), {}, _defineProperty({}, namespace, (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.omit)(searchState[namespace], [attribute])));
  }
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.omit)(searchState, [id]);
}
function cleanUpValueWithMultiIndex(_ref4) {
  var searchState = _ref4.searchState,
    indexId = _ref4.indexId,
    id = _ref4.id,
    namespace = _ref4.namespace,
    attribute = _ref4.attribute;
  var indexSearchState = searchState.indices[indexId];
  if (namespace && indexSearchState) {
    return _objectSpread(_objectSpread({}, searchState), {}, {
      indices: _objectSpread(_objectSpread({}, searchState.indices), {}, _defineProperty({}, indexId, _objectSpread(_objectSpread({}, indexSearchState), {}, _defineProperty({}, namespace, (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.omit)(indexSearchState[namespace], [attribute])))))
    });
  }
  if (indexSearchState) {
    return _objectSpread(_objectSpread({}, searchState), {}, {
      indices: _objectSpread(_objectSpread({}, searchState.indices), {}, _defineProperty({}, indexId, (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.omit)(indexSearchState, [id])))
    });
  }
  return searchState;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/metadata.js":
/*!************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/metadata.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMetadataPayload: () => (/* binding */ getMetadataPayload),
/* harmony export */   injectMetadata: () => (/* binding */ injectMetadata),
/* harmony export */   isMetadataEnabled: () => (/* binding */ isMetadataEnabled)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function isMetadataEnabled() {
  return (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && _typeof(window.navigator) === 'object' && typeof window.navigator.userAgent === 'string' && window.navigator.userAgent.includes('Algolia Crawler') && _typeof(window.document) === 'object';
}
function getMetadataPayload(widgets, searchClient) {
  var internalProps = ['contextValue', 'indexContextValue'];
  var widgetsPayload = widgets.map(function (_ref) {
    var props = _ref.props,
      constructor = _ref.constructor;
    var _ref2 = constructor._connectorDesc || {},
      _ref2$defaultProps = _ref2.defaultProps,
      defaultProps = _ref2$defaultProps === void 0 ? {} : _ref2$defaultProps,
      _ref2$displayName = _ref2.displayName,
      displayName = _ref2$displayName === void 0 ? constructor.displayName : _ref2$displayName;
    return {
      displayName: displayName,
      $$type: constructor.$$type,
      $$widgetType: constructor.$$widgetType,
      params: Object.keys(props).filter(function (prop) {
        return !internalProps.includes(prop) && defaultProps[prop] !== props[prop] && props[prop] !== undefined;
      })
    };
  });
  var client = searchClient;
  var ua = client.transporter && client.transporter.userAgent ? client.transporter.userAgent.value : client._ua;
  return {
    ua: ua,
    widgets: widgetsPayload
  };
}
function injectMetadata(widgets, searchClient) {
  var payloadContainer = document.createElement('meta');
  var refNode = document.querySelector('head');
  payloadContainer.name = 'algolia:metadata';
  var payload = getMetadataPayload(widgets, searchClient);
  payloadContainer.content = JSON.stringify(payload);
  refNode.appendChild(payloadContainer);
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/translatable.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/translatable.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ translatable)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var withKeysPropType = function withKeysPropType(keys) {
  return function (props, propName, componentName) {
    var prop = props[propName];
    if (prop) {
      // eslint-disable-next-line no-restricted-syntax
      for (var _i = 0, _Object$keys = Object.keys(prop); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        if (keys.indexOf(key) === -1) {
          return new Error("Unknown `".concat(propName, "` key `").concat(key, "`. Check the render method ") + "of `".concat(componentName, "`."));
        }
      }
    }
    return undefined;
  };
};
function translatable(defaultTranslations) {
  return function (Composed) {
    var Translatable = /*#__PURE__*/function (_Component) {
      _inherits(Translatable, _Component);
      var _super = _createSuper(Translatable);
      function Translatable() {
        var _this;
        _classCallCheck(this, Translatable);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "translate", function (key) {
          var translations = _this.props.translations;
          var translation = translations && translations.hasOwnProperty(key) ? translations[key] : defaultTranslations[key];
          if (typeof translation === 'function') {
            for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              params[_key2 - 1] = arguments[_key2];
            }
            return translation.apply(void 0, params);
          }
          return translation;
        });
        return _this;
      }
      _createClass(Translatable, [{
        key: "render",
        value: function render() {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Composed, _extends({
            translate: this.translate
          }, this.props));
        }
      }]);
      return Translatable;
    }(react__WEBPACK_IMPORTED_MODULE_0__.Component);
    var name = Composed.displayName || Composed.name || 'UnknownComponent';
    Translatable.displayName = "Translatable(".concat(name, ")");
    Translatable.propTypes = {
      translations: withKeysPropType(Object.keys(defaultTranslations))
    };
    return Translatable;
  };
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/utils.js":
/*!*********************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/utils.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAbsolutePositions: () => (/* binding */ addAbsolutePositions),
/* harmony export */   addQueryID: () => (/* binding */ addQueryID),
/* harmony export */   defer: () => (/* binding */ defer),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   getDisplayName: () => (/* binding */ getDisplayName),
/* harmony export */   getObjectType: () => (/* binding */ getObjectType),
/* harmony export */   getPropertyByPath: () => (/* binding */ getPropertyByPath),
/* harmony export */   objectHasKeys: () => (/* binding */ objectHasKeys),
/* harmony export */   omit: () => (/* binding */ omit),
/* harmony export */   removeEmptyArraysFromObject: () => (/* binding */ removeEmptyArraysFromObject),
/* harmony export */   removeEmptyKey: () => (/* binding */ removeEmptyKey),
/* harmony export */   shallowEqual: () => (/* binding */ shallowEqual),
/* harmony export */   unescapeFacetValue: () => (/* binding */ unescapeFacetValue)
/* harmony export */ });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
// eslint-disable-next-line @typescript-eslint/unbound-method
var hasOwn = Object.prototype.hasOwnProperty;

// From https://github.com/reactjs/react-redux/blob/master/src/utils/shallowEqual.js
var shallowEqual = function shallowEqual(objA, objB) {
  if (objA === objB) {
    return true;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }
  return true;
};
var getDisplayName = function getDisplayName(Component) {
  return Component.displayName || Component.name || 'UnknownComponent';
};
var resolved = Promise.resolve();
var defer = function defer(f) {
  resolved.then(f);
};
var isPlainObject = function isPlainObject(value) {
  return _typeof(value) === 'object' && value !== null && !Array.isArray(value);
};
var removeEmptyKey = function removeEmptyKey(obj) {
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];
    if (!isPlainObject(value)) {
      return;
    }
    if (!objectHasKeys(value)) {
      delete obj[key];
    } else {
      removeEmptyKey(value);
    }
  });
  return obj;
};
var removeEmptyArraysFromObject = function removeEmptyArraysFromObject(obj) {
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];
    if (Array.isArray(value) && value.length === 0) {
      delete obj[key];
    }
  });
  return obj;
};
function addAbsolutePositions(hits, hitsPerPage, page) {
  return hits.map(function (hit, index) {
    return _objectSpread(_objectSpread({}, hit), {}, {
      __position: hitsPerPage * page + index + 1
    });
  });
}
function addQueryID(hits, queryID) {
  if (!queryID) {
    return hits;
  }
  return hits.map(function (hit) {
    return _objectSpread(_objectSpread({}, hit), {}, {
      __queryID: queryID
    });
  });
}
function find(array, comparator) {
  if (!Array.isArray(array)) {
    return undefined;
  }
  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return array[i];
    }
  }
  return undefined;
}
function objectHasKeys(object) {
  return object && Object.keys(object).length > 0;
}

// https://github.com/babel/babel/blob/3aaafae053fa75febb3aa45d45b6f00646e30ba4/packages/babel-helpers/src/helpers.js#L604-L620
function omit(source, excluded) {
  if (source === null || source === undefined) {
    return {};
  }
  var target = {};
  var sourceKeys = Object.keys(source);
  for (var i = 0; i < sourceKeys.length; i++) {
    var key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) {
      // eslint-disable-next-line no-continue
      continue;
    }
    target[key] = source[key];
  }
  return target;
}

/**
 * Retrieve the value at a path of the object:
 *
 * @example
 * getPropertyByPath(
 *   { test: { this: { function: [{ now: { everyone: true } }] } } },
 *   'test.this.function[0].now.everyone'
 * ); // true
 *
 * getPropertyByPath(
 *   { test: { this: { function: [{ now: { everyone: true } }] } } },
 *   ['test', 'this', 'function', 0, 'now', 'everyone']
 * ); // true
 *
 * @param object Source object to query
 * @param path either an array of properties, or a string form of the properties, separated by .
 */
var getPropertyByPath = function getPropertyByPath(object, path) {
  return (Array.isArray(path) ? path : path.replace(/\[(\d+)]/g, '.$1').split('.')).reduce(function (current, key) {
    return current ? current[key] : undefined;
  }, object);
};
function getObjectType(object) {
  return Object.prototype.toString.call(object).slice(8, -1);
}
function unescapeFacetValue(value) {
  return value.replace(/^\\-/, '-');
}

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/core/version.js":
/*!***********************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/core/version.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ('6.40.4');

/***/ }),

/***/ "./node_modules/react-instantsearch-core/dist/es/widgets/InstantSearch.js":
/*!********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-core/dist/es/widgets/InstantSearch.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-fast-compare */ "./node_modules/react-fast-compare/index.js");
/* harmony import */ var react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_fast_compare__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_context_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/context.js */ "./node_modules/react-instantsearch-core/dist/es/core/context.js");
/* harmony import */ var _core_createInstantSearchManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/createInstantSearchManager.js */ "./node_modules/react-instantsearch-core/dist/es/core/createInstantSearchManager.js");
/* harmony import */ var _core_metadata_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/metadata.js */ "./node_modules/react-instantsearch-core/dist/es/core/metadata.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






function isControlled(props) {
  return Boolean(props.searchState);
}

/**
 * @description
 * `<InstantSearch>` is the root component of all React InstantSearch implementations.
 * It provides all the connected components (aka widgets) a means to interact
 * with the searchState.
 * @kind widget
 * @name <InstantSearch>
 * @requirements You will need to have an Algolia account to be able to use this widget.
 * [Create one now](https://www.algolia.com/users/sign_up).
 * @propType {string} indexName - Main index in which to search.
 * @propType {boolean} [refresh=false] - Flag to activate when the cache needs to be cleared so that the front-end is updated when a change occurs in the index.
 * @propType {object} [searchClient] - Provide a custom search client.
 * @propType {func} [onSearchStateChange] - Function to be called everytime a new search is done. Useful for [URL Routing](guide/Routing.html).
 * @propType {object} [searchState] - Object to inject some search state. Switches the InstantSearch component in controlled mode. Useful for [URL Routing](guide/Routing.html).
 * @propType {func} [createURL] - Function to call when creating links, useful for [URL Routing](guide/Routing.html).
 * @propType {SearchResults|SearchResults[]} [resultsState] - Use this to inject the results that will be used at first rendering. Those results are found by using the `findResultsState` function. Useful for [Server Side Rendering](guide/Server-side_rendering.html).
 * @propType {number} [stalledSearchDelay=200] - The amount of time before considering that the search takes too much time. The time is expressed in milliseconds.
 * @propType {{ Root: string|function, props: object }} [root] - Use this to customize the root element. Default value: `{ Root: 'div' }`
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <SearchBox />
 *     <Hits />
 *   </InstantSearch>
 * );
 */
var InstantSearch = /*#__PURE__*/function (_Component) {
  _inherits(InstantSearch, _Component);
  var _super = _createSuper(InstantSearch);
  function InstantSearch(props) {
    var _this;
    _classCallCheck(this, InstantSearch);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "cleanupTimerRef", null);
    _defineProperty(_assertThisInitialized(_this), "isUnmounting", false);
    var instantSearchManager = (0,_core_createInstantSearchManager_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      indexName: _this.props.indexName,
      searchClient: _this.props.searchClient,
      initialState: _this.props.searchState || {},
      resultsState: _this.props.resultsState,
      stalledSearchDelay: _this.props.stalledSearchDelay
    });
    var contextValue = {
      store: instantSearchManager.store,
      widgetsManager: instantSearchManager.widgetsManager,
      mainTargetedIndex: _this.props.indexName,
      onInternalStateUpdate: _this.onWidgetsInternalStateUpdate.bind(_assertThisInitialized(_this)),
      createHrefForState: _this.createHrefForState.bind(_assertThisInitialized(_this)),
      onSearchForFacetValues: _this.onSearchForFacetValues.bind(_assertThisInitialized(_this)),
      onSearchStateChange: _this.onSearchStateChange.bind(_assertThisInitialized(_this)),
      onSearchParameters: _this.onSearchParameters.bind(_assertThisInitialized(_this))
    };
    _this.state = {
      isControlled: isControlled(_this.props),
      instantSearchManager: instantSearchManager,
      contextValue: contextValue
    };
    return _this;
  }
  _createClass(InstantSearch, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var prevIsControlled = isControlled(prevProps);
      if (prevIsControlled && !this.state.isControlled) {
        throw new Error("You can't switch <InstantSearch> from being controlled to uncontrolled");
      }
      if (!prevIsControlled && this.state.isControlled) {
        throw new Error("You can't switch <InstantSearch> from being uncontrolled to controlled");
      }
      if (this.props.refresh !== prevProps.refresh && this.props.refresh) {
        this.state.instantSearchManager.clearCache();
      }
      if (prevProps.indexName !== this.props.indexName) {
        this.state.instantSearchManager.updateIndex(this.props.indexName);
      }
      if (prevProps.searchClient !== this.props.searchClient) {
        this.state.instantSearchManager.updateClient(this.props.searchClient);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.cleanupTimerRef) {
        clearTimeout(this.cleanupTimerRef);
        this.cleanupTimerRef = null;
      }
      if ((0,_core_metadata_js__WEBPACK_IMPORTED_MODULE_3__.isMetadataEnabled)()) {
        (0,_core_metadata_js__WEBPACK_IMPORTED_MODULE_3__.injectMetadata)(this.state.instantSearchManager.widgetsManager.getWidgets(), this.props.searchClient);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this2 = this;
      this.cleanupTimerRef = setTimeout(function () {
        _this2.isUnmounting = true;
        _this2.state.instantSearchManager.skipSearch();
      });
    }
  }, {
    key: "createHrefForState",
    value: function createHrefForState(searchState) {
      searchState = this.state.instantSearchManager.transitionState(searchState);
      return this.state.isControlled && this.props.createURL ? this.props.createURL(searchState, this.getKnownKeys()) : '#';
    }
  }, {
    key: "onWidgetsInternalStateUpdate",
    value: function onWidgetsInternalStateUpdate(searchState) {
      searchState = this.state.instantSearchManager.transitionState(searchState);
      this.onSearchStateChange(searchState);
      if (!this.state.isControlled) {
        this.state.instantSearchManager.onExternalStateUpdate(searchState);
      }
    }
  }, {
    key: "onSearchStateChange",
    value: function onSearchStateChange(searchState) {
      if (this.props.onSearchStateChange && !this.isUnmounting) {
        this.props.onSearchStateChange(searchState);
      }
    }
  }, {
    key: "onSearchParameters",
    value: function onSearchParameters(getSearchParameters, context, props, getMetadata, displayName) {
      if (this.props.onSearchParameters) {
        var _searchState = this.props.searchState ? this.props.searchState : {};
        this.props.onSearchParameters(getSearchParameters, context, props, _searchState);
      }
      if (this.props.widgetsCollector) {
        var _searchState2 = this.props.searchState ? this.props.searchState : {};
        this.props.widgetsCollector({
          getSearchParameters: getSearchParameters,
          getMetadata: getMetadata,
          context: context,
          props: props,
          searchState: _searchState2,
          displayName: displayName
        });
      }
    }
  }, {
    key: "onSearchForFacetValues",
    value: function onSearchForFacetValues(searchState) {
      this.state.instantSearchManager.onSearchForFacetValues(searchState);
    }
  }, {
    key: "getKnownKeys",
    value: function getKnownKeys() {
      return this.state.instantSearchManager.getWidgetsIds();
    }
  }, {
    key: "render",
    value: function render() {
      if (react__WEBPACK_IMPORTED_MODULE_0__.Children.count(this.props.children) === 0) {
        return null;
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_core_context_js__WEBPACK_IMPORTED_MODULE_4__.InstantSearchProvider, {
        value: this.state.contextValue
      }, this.props.children);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var nextIsControlled = isControlled(nextProps);
      var previousSearchState = prevState.instantSearchManager.store.getState().widgets;
      var nextSearchState = nextProps.searchState;
      if (nextIsControlled && !react_fast_compare__WEBPACK_IMPORTED_MODULE_1___default()(previousSearchState, nextSearchState)) {
        prevState.instantSearchManager.onExternalStateUpdate(nextProps.searchState);
      }
      return {
        isControlled: nextIsControlled,
        contextValue: _objectSpread(_objectSpread({}, prevState.contextValue), {}, {
          mainTargetedIndex: nextProps.indexName
        })
      };
    }
  }]);
  return InstantSearch;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
_defineProperty(InstantSearch, "defaultProps", {
  stalledSearchDelay: 200,
  refresh: false
});
_defineProperty(InstantSearch, "propTypes", {
  // @TODO: These props are currently constant.
  indexName: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().string).isRequired,
  searchClient: prop_types__WEBPACK_IMPORTED_MODULE_5___default().shape({
    search: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func).isRequired,
    searchForFacetValues: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
    addAlgoliaAgent: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
    clearCache: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
  }).isRequired,
  createURL: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  refresh: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().bool),
  searchState: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().object),
  onSearchStateChange: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  onSearchParameters: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  widgetsCollector: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func),
  resultsState: prop_types__WEBPACK_IMPORTED_MODULE_5___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_5___default().object), (prop_types__WEBPACK_IMPORTED_MODULE_5___default().array)]),
  children: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().node),
  stalledSearchDelay: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().number)
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InstantSearch);

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/Highlight.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/Highlight.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");
/* harmony import */ var _Highlighter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Highlighter.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Highlighter.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var cx = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_1__.createClassNames)('Highlight');
var Highlight = function Highlight(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Highlighter_js__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, props, {
    highlightProperty: "_highlightResult",
    cx: cx
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Highlight);

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/Highlighter.js":
/*!********************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/Highlighter.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Highlight: () => (/* binding */ Highlight),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);



var Highlight = function Highlight(_ref) {
  var cx = _ref.cx,
    value = _ref.value,
    highlightedTagName = _ref.highlightedTagName,
    isHighlighted = _ref.isHighlighted,
    nonHighlightedTagName = _ref.nonHighlightedTagName;
  var TagName = isHighlighted ? highlightedTagName : nonHighlightedTagName;
  var className = isHighlighted ? 'highlighted' : 'nonHighlighted';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(TagName, {
    className: cx(className)
  }, value);
};
Highlight.propTypes = {
  cx: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  value: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  isHighlighted: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool).isRequired,
  highlightedTagName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  nonHighlightedTagName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired
};
var Highlighter = function Highlighter(_ref2) {
  var cx = _ref2.cx,
    hit = _ref2.hit,
    attribute = _ref2.attribute,
    highlight = _ref2.highlight,
    highlightProperty = _ref2.highlightProperty,
    tagName = _ref2.tagName,
    nonHighlightedTagName = _ref2.nonHighlightedTagName,
    separator = _ref2.separator,
    className = _ref2.className;
  var parsedHighlightedValue = highlight({
    hit: hit,
    attribute: attribute,
    highlightProperty: highlightProperty
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(cx(''), className)
  }, parsedHighlightedValue.map(function (item, i) {
    if (Array.isArray(item)) {
      var isLast = i === parsedHighlightedValue.length - 1;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
        key: i
      }, item.map(function (element, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Highlight, {
          cx: cx,
          key: index,
          value: element.value,
          highlightedTagName: tagName,
          nonHighlightedTagName: nonHighlightedTagName,
          isHighlighted: element.isHighlighted
        });
      }), !isLast && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
        className: cx('separator')
      }, separator));
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(Highlight, {
      cx: cx,
      key: i,
      value: item.value,
      highlightedTagName: tagName,
      nonHighlightedTagName: nonHighlightedTagName,
      isHighlighted: item.isHighlighted
    });
  }));
};
Highlighter.propTypes = {
  cx: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  hit: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object).isRequired,
  attribute: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf((prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)), (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string)]).isRequired,
  highlight: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  highlightProperty: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string).isRequired,
  tagName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  nonHighlightedTagName: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
  separator: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node)
};
Highlighter.defaultProps = {
  tagName: 'em',
  nonHighlightedTagName: 'span',
  className: '',
  separator: ', '
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Highlighter);

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/Hits.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/Hits.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");




var cx = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.createClassNames)('Hits');
var DefaultHitComponent = function DefaultHitComponent(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    style: {
      borderBottom: '1px solid #bbb',
      paddingBottom: '5px',
      marginBottom: '5px',
      wordBreak: 'break-all'
    }
  }, JSON.stringify(props).slice(0, 100), "...");
};
var Hits = function Hits(_ref) {
  var hits = _ref.hits,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$hitComponent = _ref.hitComponent,
    HitComponent = _ref$hitComponent === void 0 ? DefaultHitComponent : _ref$hitComponent;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(cx(''), className)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("ul", {
    className: cx('list')
  }, hits.map(function (hit) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("li", {
      className: cx('item'),
      key: hit.objectID
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(HitComponent, {
      hit: hit
    }));
  })));
};
var HitPropTypes = prop_types__WEBPACK_IMPORTED_MODULE_3___default().shape({
  objectID: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number)]).isRequired
});
Hits.propTypes = {
  hits: prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(HitPropTypes.isRequired).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  // this is actually PropTypes.elementType, but our prop-types version is outdated
  hitComponent: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().any)
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Hits);

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/Link.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/Link.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Link)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var Link = /*#__PURE__*/function (_Component) {
  _inherits(Link, _Component);
  var _super = _createSuper(Link);
  function Link() {
    var _this;
    _classCallCheck(this, Link);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onClick", function (e) {
      if ((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_1__.isSpecialClick)(e)) {
        return;
      }
      _this.props.onClick();
      e.preventDefault();
    });
    return _this;
  }
  _createClass(Link, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", _extends({}, this.props, {
        onClick: this.onClick
      }));
    }
  }]);
  return Link;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
_defineProperty(Link, "propTypes", {
  onClick: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired
});


/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/LinkList.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/LinkList.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LinkList)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Link_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Link.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Link.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var LinkList = /*#__PURE__*/function (_Component) {
  _inherits(LinkList, _Component);
  var _super = _createSuper(LinkList);
  function LinkList() {
    _classCallCheck(this, LinkList);
    return _super.apply(this, arguments);
  }
  _createClass(LinkList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        cx = _this$props.cx,
        createURL = _this$props.createURL,
        items = _this$props.items,
        onSelect = _this$props.onSelect,
        canRefine = _this$props.canRefine;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
        className: cx('list', !canRefine && 'list--noRefinement')
      }, items.map(function (item) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
          key: item.key === undefined ? item.value : item.key,
          className: cx('item', item.selected && !item.disabled && 'item--selected', item.disabled && 'item--disabled', item.modifier)
        }, item.disabled ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
          className: cx('link')
        }, item.label === undefined ? item.value : item.label) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Link_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
          className: cx('link', item.selected && 'link--selected'),
          "aria-label": item.ariaLabel,
          href: createURL(item.value),
          onClick: function onClick() {
            return onSelect(item.value);
          }
        }, item.label === undefined ? item.value : item.label));
      }));
    }
  }]);
  return LinkList;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
_defineProperty(LinkList, "propTypes", {
  cx: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  createURL: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  items: prop_types__WEBPACK_IMPORTED_MODULE_2___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default().shape({
    value: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number), (prop_types__WEBPACK_IMPORTED_MODULE_2___default().object)]).isRequired,
    key: prop_types__WEBPACK_IMPORTED_MODULE_2___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_2___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_2___default().number)]),
    label: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().node),
    modifier: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    ariaLabel: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    disabled: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool)
  })),
  onSelect: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().func).isRequired,
  canRefine: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().bool).isRequired
});


/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/Pagination.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/Pagination.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/core/translatable.js");
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");
/* harmony import */ var _LinkList_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./LinkList.js */ "./node_modules/react-instantsearch-dom/dist/es/components/LinkList.js");
var _excluded = ["listComponent", "nbPages", "totalPages", "currentRefinement", "padding", "showFirst", "showPrevious", "showNext", "showLast", "refine", "createURL", "canRefine", "translate", "className"];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






var cx = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.createClassNames)('Pagination');

// Determines the size of the widget (the number of pages displayed - that the user can directly click on)
function calculateSize(padding, maxPages) {
  return Math.min(2 * padding + 1, maxPages);
}
function calculatePaddingLeft(currentPage, padding, maxPages, size) {
  if (currentPage <= padding) {
    return currentPage;
  }
  if (currentPage >= maxPages - padding) {
    return size - (maxPages - currentPage);
  }
  return padding + 1;
}

// Retrieve the correct page range to populate the widget
function getPages(currentPage, maxPages, padding) {
  var size = calculateSize(padding, maxPages);
  // If the widget size is equal to the max number of pages, return the entire page range
  if (size === maxPages) return (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.range)({
    start: 1,
    end: maxPages + 1
  });
  var paddingLeft = calculatePaddingLeft(currentPage, padding, maxPages, size);
  var paddingRight = size - paddingLeft;
  var first = currentPage - paddingLeft;
  var last = currentPage + paddingRight;
  return (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.range)({
    start: first + 1,
    end: last + 1
  });
}
var Pagination = /*#__PURE__*/function (_Component) {
  _inherits(Pagination, _Component);
  var _super = _createSuper(Pagination);
  function Pagination() {
    _classCallCheck(this, Pagination);
    return _super.apply(this, arguments);
  }
  _createClass(Pagination, [{
    key: "getItem",
    value: function getItem(modifier, translationKey, value) {
      var _this$props = this.props,
        nbPages = _this$props.nbPages,
        totalPages = _this$props.totalPages,
        translate = _this$props.translate;
      return {
        key: "".concat(modifier, ".").concat(value),
        modifier: modifier,
        disabled: value < 1 || value >= Math.min(totalPages, nbPages),
        label: translate(translationKey, value),
        value: value,
        ariaLabel: translate("aria".concat((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.capitalize)(translationKey)), value)
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        ListComponent = _this$props2.listComponent,
        nbPages = _this$props2.nbPages,
        totalPages = _this$props2.totalPages,
        currentRefinement = _this$props2.currentRefinement,
        padding = _this$props2.padding,
        showFirst = _this$props2.showFirst,
        showPrevious = _this$props2.showPrevious,
        showNext = _this$props2.showNext,
        showLast = _this$props2.showLast,
        refine = _this$props2.refine,
        createURL = _this$props2.createURL,
        canRefine = _this$props2.canRefine,
        translate = _this$props2.translate,
        className = _this$props2.className,
        otherProps = _objectWithoutProperties(_this$props2, _excluded);
      var maxPages = Math.min(nbPages, totalPages);
      var lastPage = maxPages;
      var items = [];
      if (showFirst) {
        items.push({
          key: 'first',
          modifier: 'item--firstPage',
          disabled: currentRefinement === 1,
          label: translate('first'),
          value: 1,
          ariaLabel: translate('ariaFirst')
        });
      }
      if (showPrevious) {
        items.push({
          key: 'previous',
          modifier: 'item--previousPage',
          disabled: currentRefinement === 1,
          label: translate('previous'),
          value: currentRefinement - 1,
          ariaLabel: translate('ariaPrevious')
        });
      }
      items = items.concat(getPages(currentRefinement, maxPages, padding).map(function (value) {
        return {
          key: value,
          modifier: 'item--page',
          label: translate('page', value),
          value: value,
          selected: value === currentRefinement,
          ariaLabel: translate('ariaPage', value)
        };
      }));
      if (showNext) {
        items.push({
          key: 'next',
          modifier: 'item--nextPage',
          disabled: currentRefinement === lastPage || lastPage <= 1,
          label: translate('next'),
          value: currentRefinement + 1,
          ariaLabel: translate('ariaNext')
        });
      }
      if (showLast) {
        items.push({
          key: 'last',
          modifier: 'item--lastPage',
          disabled: currentRefinement === lastPage || lastPage <= 1,
          label: translate('last'),
          value: lastPage,
          ariaLabel: translate('ariaLast')
        });
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(cx('', !canRefine && '-noRefinement'), className)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(ListComponent, _extends({}, otherProps, {
        cx: cx,
        items: items,
        onSelect: refine,
        createURL: createURL,
        canRefine: canRefine
      })));
    }
  }]);
  return Pagination;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);
_defineProperty(Pagination, "propTypes", {
  nbPages: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number).isRequired,
  currentRefinement: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number).isRequired,
  refine: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired,
  createURL: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired,
  canRefine: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool).isRequired,
  translate: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired,
  listComponent: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
  showFirst: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  showPrevious: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  showNext: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  showLast: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  padding: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  totalPages: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
});
_defineProperty(Pagination, "defaultProps", {
  listComponent: _LinkList_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  showFirst: true,
  showPrevious: true,
  showNext: true,
  showLast: false,
  padding: 3,
  totalPages: Infinity,
  className: ''
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_5__["default"])({
  previous: '‹',
  next: '›',
  first: '«',
  last: '»',
  page: function page(currentRefinement) {
    return currentRefinement.toString();
  },
  ariaPrevious: 'Previous page',
  ariaNext: 'Next page',
  ariaFirst: 'First page',
  ariaLast: 'Last page',
  ariaPage: function ariaPage(currentRefinement) {
    return "Page ".concat(currentRefinement.toString());
  }
})(Pagination));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/Panel.js":
/*!**************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/Panel.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PanelConsumer: () => (/* binding */ PanelConsumer),
/* harmony export */   PanelProvider: () => (/* binding */ PanelProvider),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var cx = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.createClassNames)('Panel');
var _createContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(function setCanRefine() {}),
  PanelConsumer = _createContext.Consumer,
  PanelProvider = _createContext.Provider;

var Panel = /*#__PURE__*/function (_Component) {
  _inherits(Panel, _Component);
  var _super = _createSuper(Panel);
  function Panel() {
    var _this;
    _classCallCheck(this, Panel);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      canRefine: true
    });
    _defineProperty(_assertThisInitialized(_this), "setCanRefine", function (nextCanRefine) {
      _this.setState({
        canRefine: nextCanRefine
      });
    });
    return _this;
  }
  _createClass(Panel, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        children = _this$props.children,
        className = _this$props.className,
        header = _this$props.header,
        footer = _this$props.footer;
      var canRefine = this.state.canRefine;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(cx('', !canRefine && '-noRefinement'), className)
      }, header && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: cx('header')
      }, header), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: cx('body')
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(PanelProvider, {
        value: this.setCanRefine
      }, children)), footer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: cx('footer')
      }, footer));
    }
  }]);
  return Panel;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);
_defineProperty(Panel, "propTypes", {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  header: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),
  footer: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node)
});
_defineProperty(Panel, "defaultProps", {
  className: '',
  header: null,
  footer: null
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Panel);

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/PanelCallbackHandler.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/PanelCallbackHandler.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Panel_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Panel.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Panel.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var PanelCallbackHandler = /*#__PURE__*/function (_Component) {
  _inherits(PanelCallbackHandler, _Component);
  var _super = _createSuper(PanelCallbackHandler);
  function PanelCallbackHandler() {
    _classCallCheck(this, PanelCallbackHandler);
    return _super.apply(this, arguments);
  }
  _createClass(PanelCallbackHandler, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.setCanRefine(this.props.canRefine);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.canRefine !== this.props.canRefine) {
        this.props.setCanRefine(this.props.canRefine);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return PanelCallbackHandler;
}(react__WEBPACK_IMPORTED_MODULE_0__.Component);
_defineProperty(PanelCallbackHandler, "propTypes", {
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node).isRequired,
  canRefine: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  setCanRefine: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func).isRequired
});
var PanelWrapper = function PanelWrapper(_ref) {
  var canRefine = _ref.canRefine,
    children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Panel_js__WEBPACK_IMPORTED_MODULE_2__.PanelConsumer, null, function (setCanRefine) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(PanelCallbackHandler, {
      setCanRefine: setCanRefine,
      canRefine: canRefine
    }, children);
  });
};
PanelWrapper.propTypes = {
  canRefine: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool).isRequired,
  children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().node).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PanelWrapper);

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/PoweredBy.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/PoweredBy.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/core/translatable.js");
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var cx = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.createClassNames)('PoweredBy');
var _ref = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("path", {
  fill: "#003DFF",
  d: "M249.5 64.2V1.4c0-.9-.7-1.5-1.6-1.4L236.2 2a1.4 1.4 0 0 0-1.2 1.3V67c0 3 0 21.6 22.4 22.3a1.4 1.4 0 0 0 1.5-1.4v-9.5c0-.7-.6-1.3-1.2-1.4-8.2-.9-8.2-11-8.2-12.7ZM443.5 24.4h-11.8c-.8 0-1.4.6-1.4 1.4v62c0 .8.6 1.4 1.4 1.4h11.8c.8 0 1.4-.6 1.4-1.4v-62c0-.8-.6-1.4-1.4-1.4ZM431.7 16.6h11.8c.8 0 1.4-.6 1.4-1.3v-14c0-.8-.7-1.4-1.6-1.3L431.5 2a1.4 1.4 0 0 0-1.2 1.3v12c0 .8.6 1.4 1.4 1.4Zm-20.5 47.6V1.4c0-.9-.7-1.5-1.5-1.4L397.9 2a1.4 1.4 0 0 0-1.2 1.3V67c0 3 0 21.6 22.4 22.3a1.4 1.4 0 0 0 1.5-1.4v-9.5c0-.7-.5-1.3-1.2-1.4-8.2-.9-8.2-11-8.2-12.7Zm-30.7-31c-2.6-2.8-5.8-5-9.6-6.5a31.7 31.7 0 0 0-12-2.3c-4.5 0-8.5.7-12.2 2.3A27.9 27.9 0 0 0 331 43.5a39.6 39.6 0 0 0 0 26.3c1.5 4 3.6 7.5 6.2 10.3 2.6 2.9 5.8 5 9.5 6.7a38 38 0 0 0 12.2 2.4c2.8 0 8.6-.9 12.3-2.4a27 27 0 0 0 9.5-6.7 35.1 35.1 0 0 0 8.3-23c0-4.9-.8-9.6-2.4-13.6-1.5-4-3.5-7.4-6.1-10.2ZM370 71.5a13.1 13.1 0 0 1-11.2 5.6 13 13 0 0 1-11.2-5.6c-2.7-3.6-4-7.9-4-14.2 0-6.3 1.3-11.5 4-15.1a13 13 0 0 1 11.1-5.5 13 13 0 0 1 11.3 5.5c2.6 3.6 4 8.8 4 15 0 6.4-1.3 10.6-4 14.3Zm-161.6-47H197a32 32 0 0 0-27 15 33.8 33.8 0 0 0 8.9 45.9 18.8 18.8 0 0 0 11.2 3.1H191.2l.6-.2h.2a21 21 0 0 0 16.5-14.6V87c0 .8.6 1.4 1.4 1.4h11.7c.8 0 1.4-.6 1.4-1.4V25.8c0-.8-.6-1.4-1.4-1.4h-13Zm0 48.3a17.8 17.8 0 0 1-10.4 3.5h-.2a12.5 12.5 0 0 1-.7 0A18.4 18.4 0 0 1 180.4 51c2.7-6.8 9-11.6 16.6-11.6h11.5v33.3Zm289-48.3H486a32 32 0 0 0-27 15 33.8 33.8 0 0 0 8.8 45.9 18.8 18.8 0 0 0 11.3 3.1h1.1l.6-.2h.2a21 21 0 0 0 16.5-14.6V87c0 .8.6 1.4 1.4 1.4h11.7c.8 0 1.4-.6 1.4-1.4V25.8c0-.8-.6-1.4-1.4-1.4h-13.1Zm0 48.3a17.8 17.8 0 0 1-10.5 3.5h-.9A18.4 18.4 0 0 1 469.4 51c2.6-6.8 9-11.6 16.6-11.6h11.5v33.3ZM306.3 24.4h-11.5a32 32 0 0 0-27 15 33.7 33.7 0 0 0-5.1 14.6 34.6 34.6 0 0 0 0 7.6c1 8.9 5.4 16.7 11.8 22a19.5 19.5 0 0 0 2.2 1.7 18.8 18.8 0 0 0 21.6-.6c3.8-2.7 6.7-6.7 8-11.1V87.9c0 5-1.3 8.9-4 11.5-2.7 2.6-7.3 3.9-13.6 3.9-2.6 0-6.7-.2-10.9-.6a1.4 1.4 0 0 0-1.4 1l-3 10a1.4 1.4 0 0 0 1.1 1.8c5 .7 10 1 12.8 1 11.4 0 19.8-2.4 25.3-7.4 5-4.6 7.8-11.4 8.2-20.7V25.8c0-.8-.6-1.4-1.3-1.4h-13.2Zm0 15s.2 32.4 0 33.4a17.5 17.5 0 0 1-10 3.4h-.2a13.6 13.6 0 0 1-1.7 0A18.7 18.7 0 0 1 278.3 51c2.6-6.8 9-11.6 16.5-11.6h11.5ZM58.2 0A58.3 58.3 0 1 0 86 109.5c.9-.5 1-1.6.3-2.2l-5.5-4.9a3.8 3.8 0 0 0-4-.6A47 47 0 0 1 11 57.5 47.3 47.3 0 0 1 58.2 11h47.3v84L78.7 71.2a2 2 0 0 0-3 .3 22 22 0 1 1 4.4-15.2 4 4 0 0 0 1.3 2.6l7 6.2c.8.7 2 .3 2.3-.8a33 33 0 0 0-30.4-39 33 33 0 0 0-35 32 33.3 33.3 0 0 0 32.2 33.9 32.8 32.8 0 0 0 20-6.3l35.1 31c1.5 1.4 3.9.3 3.9-1.7V2.2a2.2 2.2 0 0 0-2.2-2.2h-56Z"
});
var AlgoliaLogo = function AlgoliaLogo() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("svg", {
    viewBox: "0 0 512 117",
    width: "118",
    height: "27",
    className: cx('logo')
  }, _ref);
};
var _ref2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement(AlgoliaLogo, null);
var PoweredBy = /*#__PURE__*/function (_Component) {
  _inherits(PoweredBy, _Component);
  var _super = _createSuper(PoweredBy);
  function PoweredBy() {
    _classCallCheck(this, PoweredBy);
    return _super.apply(this, arguments);
  }
  _createClass(PoweredBy, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
        url = _this$props.url,
        translate = _this$props.translate,
        className = _this$props.className;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(cx(''), className)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
        className: cx('text')
      }, translate('searchBy')), ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a", {
        href: url,
        target: "_blank",
        className: cx('link'),
        "aria-label": "Algolia",
        rel: "noopener noreferrer"
      }, _ref2));
    }
  }]);
  return PoweredBy;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);
_defineProperty(PoweredBy, "propTypes", {
  url: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string).isRequired,
  translate: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired,
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_4__["default"])({
  searchBy: 'Search by'
})(PoweredBy));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/SearchBox.js":
/*!******************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/SearchBox.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/core/translatable.js");
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }





var cx = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.createClassNames)('SearchBox');
var defaultLoadingIndicator = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 38 38",
  xmlns: "http://www.w3.org/2000/svg",
  stroke: "#444",
  className: cx('loadingIcon'),
  "aria-hidden": "true"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("g", {
  fill: "none",
  fillRule: "evenodd"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("g", {
  transform: "translate(1 1)",
  strokeWidth: "2"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("circle", {
  strokeOpacity: ".5",
  cx: "18",
  cy: "18",
  r: "18"
}), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("path", {
  d: "M36 18c0-9.94-8.06-18-18-18"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("animateTransform", {
  attributeName: "transform",
  type: "rotate",
  from: "0 18 18",
  to: "360 18 18",
  dur: "1s",
  repeatCount: "indefinite"
})))));
var defaultReset = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("svg", {
  className: cx('resetIcon'),
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 20 20",
  width: "10",
  height: "10",
  "aria-hidden": "true"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("path", {
  d: "M8.114 10L.944 2.83 0 1.885 1.886 0l.943.943L10 8.113l7.17-7.17.944-.943L20 1.886l-.943.943-7.17 7.17 7.17 7.17.943.944L18.114 20l-.943-.943-7.17-7.17-7.17 7.17-.944.943L0 18.114l.943-.943L8.113 10z"
}));
var defaultSubmit = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("svg", {
  className: cx('submitIcon'),
  xmlns: "http://www.w3.org/2000/svg",
  width: "10",
  height: "10",
  viewBox: "0 0 40 40",
  "aria-hidden": "true"
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("path", {
  d: "M26.804 29.01c-2.832 2.34-6.465 3.746-10.426 3.746C7.333 32.756 0 25.424 0 16.378 0 7.333 7.333 0 16.378 0c9.046 0 16.378 7.333 16.378 16.378 0 3.96-1.406 7.594-3.746 10.426l10.534 10.534c.607.607.61 1.59-.004 2.202-.61.61-1.597.61-2.202.004L26.804 29.01zm-10.426.627c7.323 0 13.26-5.936 13.26-13.26 0-7.32-5.937-13.257-13.26-13.257C9.056 3.12 3.12 9.056 3.12 16.378c0 7.323 5.936 13.26 13.258 13.26z"
}));
var SearchBox = /*#__PURE__*/function (_Component) {
  _inherits(SearchBox, _Component);
  var _super = _createSuper(SearchBox);
  function SearchBox(props) {
    var _this;
    _classCallCheck(this, SearchBox);
    _this = _super.call(this);
    _defineProperty(_assertThisInitialized(_this), "getQuery", function () {
      return _this.props.searchAsYouType ? _this.props.currentRefinement : _this.state.query;
    });
    _defineProperty(_assertThisInitialized(_this), "onInputMount", function (input) {
      _this.input = input;
      if (!_this.props.inputRef) return;
      if (typeof _this.props.inputRef === 'function') {
        _this.props.inputRef(input);
      } else {
        _this.props.inputRef.current = input;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function (e) {
      if (!_this.props.focusShortcuts) {
        return;
      }
      var shortcuts = _this.props.focusShortcuts.map(function (key) {
        return typeof key === 'string' ? key.toUpperCase().charCodeAt(0) : key;
      });
      var elt = e.target || e.srcElement;
      var tagName = elt.tagName;
      if (elt.isContentEditable || tagName === 'INPUT' || tagName === 'SELECT' || tagName === 'TEXTAREA') {
        // already in an input
        return;
      }
      var which = e.which || e.keyCode;
      if (shortcuts.indexOf(which) === -1) {
        // not the right shortcut
        return;
      }
      _this.input.focus();
      e.stopPropagation();
      e.preventDefault();
    });
    _defineProperty(_assertThisInitialized(_this), "onSubmit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.input.blur();
      var _this$props = _this.props,
        refine = _this$props.refine,
        searchAsYouType = _this$props.searchAsYouType;
      if (!searchAsYouType) {
        refine(_this.getQuery());
      }
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "onChange", function (event) {
      var _this$props2 = _this.props,
        searchAsYouType = _this$props2.searchAsYouType,
        refine = _this$props2.refine,
        onChange = _this$props2.onChange;
      var value = event.target.value;
      if (searchAsYouType) {
        refine(value);
      } else {
        _this.setState({
          query: value
        });
      }
      if (onChange) {
        onChange(event);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onReset", function (event) {
      var _this$props3 = _this.props,
        searchAsYouType = _this$props3.searchAsYouType,
        refine = _this$props3.refine,
        onReset = _this$props3.onReset;
      refine('');
      _this.input.focus();
      if (!searchAsYouType) {
        _this.setState({
          query: ''
        });
      }
      if (onReset) {
        onReset(event);
      }
    });
    _this.state = {
      query: props.searchAsYouType ? null : props.currentRefinement
    };
    return _this;
  }
  _createClass(SearchBox, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keydown', this.onKeyDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!this.props.searchAsYouType && prevProps.currentRefinement !== this.props.currentRefinement) {
        this.setState({
          query: this.props.currentRefinement
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props4 = this.props,
        className = _this$props4.className,
        inputId = _this$props4.inputId,
        translate = _this$props4.translate,
        autoFocus = _this$props4.autoFocus,
        loadingIndicator = _this$props4.loadingIndicator,
        submit = _this$props4.submit,
        reset = _this$props4.reset;
      var query = this.getQuery();
      var searchInputEvents = Object.keys(this.props).reduce(function (props, prop) {
        if (['onsubmit', 'onreset', 'onchange'].indexOf(prop.toLowerCase()) === -1 && prop.indexOf('on') === 0) {
          return _objectSpread(_objectSpread({}, props), {}, _defineProperty({}, prop, _this2.props[prop]));
        }
        return props;
      }, {});
      var isSearchStalled = this.props.showLoadingIndicator && this.props.isSearchStalled;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("div", {
        className: classnames__WEBPACK_IMPORTED_MODULE_0___default()(cx(''), className)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("form", {
        ref: this.props.formRef,
        noValidate: true,
        onSubmit: this.props.onSubmit ? this.props.onSubmit : this.onSubmit,
        onReset: this.onReset,
        className: cx('form', isSearchStalled && 'form--stalledSearch'),
        action: "",
        role: "search"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("input", _extends({
        ref: this.onInputMount,
        id: inputId,
        type: "search",
        placeholder: translate('placeholder'),
        autoFocus: autoFocus,
        autoComplete: "off",
        autoCorrect: "off",
        autoCapitalize: "off",
        spellCheck: "false",
        required: true,
        maxLength: "512",
        value: query,
        onChange: this.onChange
      }, searchInputEvents, {
        className: cx('input')
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
        type: "submit",
        title: translate('submitTitle'),
        className: cx('submit')
      }, submit), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("button", {
        type: "reset",
        title: translate('resetTitle'),
        className: cx('reset'),
        hidden: !query || isSearchStalled
      }, reset), this.props.showLoadingIndicator && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("span", {
        hidden: !isSearchStalled,
        className: cx('loadingIndicator')
      }, loadingIndicator)));
    }
  }]);
  return SearchBox;
}(react__WEBPACK_IMPORTED_MODULE_1__.Component);
_defineProperty(SearchBox, "propTypes", {
  currentRefinement: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  className: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string),
  refine: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired,
  translate: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func).isRequired,
  loadingIndicator: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),
  reset: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),
  submit: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().node),
  focusShortcuts: prop_types__WEBPACK_IMPORTED_MODULE_3___default().arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_3___default().string), (prop_types__WEBPACK_IMPORTED_MODULE_3___default().number)])),
  autoFocus: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  searchAsYouType: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  onSubmit: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
  onReset: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
  onChange: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().func),
  isSearchStalled: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  showLoadingIndicator: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().bool),
  formRef: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_3___default().func), prop_types__WEBPACK_IMPORTED_MODULE_3___default().exact({
    current: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)
  })]),
  inputRef: prop_types__WEBPACK_IMPORTED_MODULE_3___default().oneOfType([(prop_types__WEBPACK_IMPORTED_MODULE_3___default().func), prop_types__WEBPACK_IMPORTED_MODULE_3___default().exact({
    current: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().object)
  })]),
  inputId: (prop_types__WEBPACK_IMPORTED_MODULE_3___default().string)
});
_defineProperty(SearchBox, "defaultProps", {
  currentRefinement: '',
  className: '',
  focusShortcuts: ['s', '/'],
  autoFocus: false,
  searchAsYouType: true,
  showLoadingIndicator: false,
  isSearchStalled: false,
  loadingIndicator: defaultLoadingIndicator,
  reset: defaultReset,
  submit: defaultSubmit
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_4__["default"])({
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…'
})(SearchBox));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/components/Snippet.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/components/Snippet.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/utils.js */ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js");
/* harmony import */ var _Highlighter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Highlighter.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Highlighter.js");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var cx = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_1__.createClassNames)('Snippet');
var Snippet = function Snippet(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_Highlighter_js__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, props, {
    highlightProperty: "_snippetResult",
    cx: cx
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Snippet);

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/core/utils.js":
/*!********************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/core/utils.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   capitalize: () => (/* binding */ capitalize),
/* harmony export */   createClassNames: () => (/* binding */ createClassNames),
/* harmony export */   find: () => (/* binding */ find),
/* harmony export */   isSpecialClick: () => (/* binding */ isSpecialClick),
/* harmony export */   range: () => (/* binding */ range)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var createClassNames = function createClassNames(block) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ais';
  return function () {
    for (var _len = arguments.length, elements = new Array(_len), _key = 0; _key < _len; _key++) {
      elements[_key] = arguments[_key];
    }
    var suitElements = elements.filter(function (element) {
      return element || element === '';
    }).map(function (element) {
      var baseClassName = "".concat(prefix, "-").concat(block);
      return element ? "".concat(baseClassName, "-").concat(element) : baseClassName;
    });
    return classnames__WEBPACK_IMPORTED_MODULE_0___default()(suitElements);
  };
};
var isSpecialClick = function isSpecialClick(event) {
  var isMiddleClick = event.button === 1;
  return Boolean(isMiddleClick || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey);
};
var capitalize = function capitalize(key) {
  return key.length === 0 ? '' : "".concat(key[0].toUpperCase()).concat(key.slice(1));
};
// taken from InstantSearch.js/utils
function range(_ref) {
  var _ref$start = _ref.start,
    start = _ref$start === void 0 ? 0 : _ref$start,
    end = _ref.end,
    _ref$step = _ref.step,
    step = _ref$step === void 0 ? 1 : _ref$step;
  // We can't divide by 0 so we re-assign the step to 1 if it happens.
  var limitStep = step === 0 ? 1 : step;

  // In some cases the array to create has a decimal length.
  // We therefore need to round the value.
  // Example:
  //   { start: 1, end: 5000, step: 500 }
  //   => Array length = (5000 - 1) / 500 = 9.998
  var arrayLength = Math.round((end - start) / limitStep);
  return _toConsumableArray(Array(arrayLength)).map(function (_, current) {
    return (start + current) * limitStep;
  });
}
function find(array, comparator) {
  if (!Array.isArray(array)) {
    return undefined;
  }
  for (var i = 0; i < array.length; i++) {
    if (comparator(array[i])) {
      return array[i];
    }
  }
  return undefined;
}

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/widgets/Highlight.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/widgets/Highlight.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/connectors/connectHighlight.js");
/* harmony import */ var _components_Highlight_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Highlight.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Highlight.js");



/**
 * Renders any attribute from a hit into its highlighted form when relevant.
 *
 * Read more about it in the [Highlighting results](guide/Highlighting_results.html) guide.
 * @name Highlight
 * @kind widget
 * @propType {string} attribute - location of the highlighted attribute in the hit (the corresponding element can be either a string or an array of strings)
 * @propType {object} hit - hit object containing the highlighted attribute
 * @propType {string} [tagName='em'] - tag to be used for highlighted parts of the hit
 * @propType {string} [nonHighlightedTagName='span'] - tag to be used for the parts of the hit that are not highlighted
 * @propType {node} [separator=',<space>'] - symbol used to separate the elements of the array in case the attribute points to an array of strings.
 * @themeKey ais-Highlight - root of the component
 * @themeKey ais-Highlight-highlighted - part of the text which is highlighted
 * @themeKey ais-Highlight-nonHighlighted - part of the text that is not highlighted
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
 *
 * const Hit = ({ hit }) => (
 *   <div>
 *     <Highlight attribute="name" hit={hit} />
 *   </div>
 * );
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <SearchBox defaultRefinement="Pho" />
 *     <Hits hitComponent={Hit} />
 *   </InstantSearch>
 * );
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__["default"])(_components_Highlight_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  $$widgetType: 'ais.highlight'
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/widgets/Hits.js":
/*!**********************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/widgets/Hits.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/connectors/connectHits.js");
/* harmony import */ var _components_Hits_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Hits.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Hits.js");



/**
 * Displays a list of hits.
 *
 * To configure the number of hits being shown, use the [HitsPerPage widget](widgets/HitsPerPage.html),
 * [connectHitsPerPage connector](connectors/connectHitsPerPage.html) or the [Configure widget](widgets/Configure.html).
 *
 * @name Hits
 * @kind widget
 * @propType {Component} [hitComponent] - Component used for rendering each hit from
 *   the results. If it is not provided the rendering defaults to displaying the
 *   hit in its JSON form. The component will be called with a `hit` prop.
 * @themeKey ais-Hits - the root div of the widget
 * @themeKey ais-Hits-list - the list of results
 * @themeKey ais-Hits-item - the hit list item
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, Hits } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <Hits />
 *   </InstantSearch>
 * );
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__["default"])(_components_Hits_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  $$widgetType: 'ais.hits'
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/widgets/Pagination.js":
/*!****************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/widgets/Pagination.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/connectors/connectPagination.js");
/* harmony import */ var _components_Pagination_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Pagination.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Pagination.js");
/* harmony import */ var _components_PanelCallbackHandler_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PanelCallbackHandler.js */ "./node_modules/react-instantsearch-dom/dist/es/components/PanelCallbackHandler.js");





/**
 * The Pagination widget displays a simple pagination system allowing the user to
 * change the current page.
 * @name Pagination
 * @kind widget
 * @propType {boolean} [showFirst=true] - Display the first page link.
 * @propType {boolean} [showLast=false] - Display the last page link.
 * @propType {boolean} [showPrevious=true] - Display the previous page link.
 * @propType {boolean} [showNext=true] - Display the next page link.
 * @propType {number} [padding=3] - How many page links to display around the current page.
 * @propType {number} [totalPages=Infinity] - Maximum number of pages to display.
 * @themeKey ais-Pagination - the root div of the widget
 * @themeKey ais-Pagination--noRefinement - the root div of the widget when there is no refinement
 * @themeKey ais-Pagination-list - the list of all pagination items
 * @themeKey ais-Pagination-list--noRefinement - the list of all pagination items when there is no refinement
 * @themeKey ais-Pagination-item - the pagination list item
 * @themeKey ais-Pagination-item--firstPage - the "first" pagination list item
 * @themeKey ais-Pagination-item--lastPage - the "last" pagination list item
 * @themeKey ais-Pagination-item--previousPage - the "previous" pagination list item
 * @themeKey ais-Pagination-item--nextPage - the "next" pagination list item
 * @themeKey ais-Pagination-item--page - the "page" pagination list item
 * @themeKey ais-Pagination-item--selected - the selected pagination list item
 * @themeKey ais-Pagination-item--disabled - the disabled pagination list item
 * @themeKey ais-Pagination-link - the pagination clickable element
 * @translationKey previous - Label value for the previous page link
 * @translationKey next - Label value for the next page link
 * @translationKey first - Label value for the first page link
 * @translationKey last - Label value for the last page link
 * @translationkey page - Label value for a page item. You get function(currentRefinement) and you need to return a string
 * @translationKey ariaPrevious - Accessibility label value for the previous page link
 * @translationKey ariaNext - Accessibility label value for the next page link
 * @translationKey ariaFirst - Accessibility label value for the first page link
 * @translationKey ariaLast - Accessibility label value for the last page link
 * @translationkey ariaPage - Accessibility label value for a page item. You get function(currentRefinement) and you need to return a string
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, Pagination } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <Pagination />
 *   </InstantSearch>
 * );
 */

var PaginationWidget = function PaginationWidget(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_PanelCallbackHandler_js__WEBPACK_IMPORTED_MODULE_1__["default"], props, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Pagination_js__WEBPACK_IMPORTED_MODULE_2__["default"], props));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_3__["default"])(PaginationWidget, {
  $$widgetType: 'ais.pagination'
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/widgets/PoweredBy.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/widgets/PoweredBy.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/connectors/connectPoweredBy.js");
/* harmony import */ var _components_PoweredBy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/PoweredBy.js */ "./node_modules/react-instantsearch-dom/dist/es/components/PoweredBy.js");



/**
 * PoweredBy displays an Algolia logo.
 *
 * Algolia requires that you use this widget if you are on a [community or free plan](https://www.algolia.com/pricing).
 * @name PoweredBy
 * @kind widget
 * @themeKey ais-PoweredBy - the root div of the widget
 * @themeKey ais-PoweredBy-text - the text of the widget
 * @themeKey ais-PoweredBy-link - the link of the logo
 * @themeKey ais-PoweredBy-logo - the logo of the widget
 * @translationKey searchBy - Label value for the powered by
 * @example
 * import React from 'react';
 * import { InstantSearch, PoweredBy } from 'react-instantsearch-dom';
 * import algoliasearch from 'algoliasearch/lite';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <PoweredBy />
 *   </InstantSearch>
 * );
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__["default"])(_components_PoweredBy_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  $$widgetType: 'ais.poweredBy'
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/widgets/SearchBox.js":
/*!***************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/widgets/SearchBox.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/connectors/connectSearchBox.js");
/* harmony import */ var _components_SearchBox_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/SearchBox.js */ "./node_modules/react-instantsearch-dom/dist/es/components/SearchBox.js");



/**
 * The SearchBox component displays a search box that lets the user search for a specific query.
 * @name SearchBox
 * @kind widget
 * @propType {string[]} [focusShortcuts=['s','/']] - List of keyboard shortcuts that focus the search box. Accepts key names and key codes.
 * @propType {boolean} [autoFocus=false] - Should the search box be focused on render?
 * @propType {boolean} [searchAsYouType=true] - Should we search on every change to the query? If you disable this option, new searches will only be triggered by clicking the search button or by pressing the enter key while the search box is focused.
 * @propType {function} [onSubmit] - Intercept submit event sent from the SearchBox form container.
 * @propType {function} [onReset] - Listen to `reset` event sent from the SearchBox form container.
 * @propType {function} [on*] - Listen to any events sent from the search input itself.
 * @propType {node} [submit] - Change the apparence of the default submit button (magnifying glass).
 * @propType {node} [reset] - Change the apparence of the default reset button (cross).
 * @propType {node} [loadingIndicator] - Change the apparence of the default loading indicator (spinning circle).
 * @propType {string} [defaultRefinement] - Provide default refinement value when component is mounted.
 * @propType {string} [inputId] - The id of the search input
 * @propType {boolean} [showLoadingIndicator=false] - Display that the search is loading. This only happens after a certain amount of time to avoid a blinking effect. This timer can be configured with `stalledSearchDelay` props on <InstantSearch>. By default, the value is 200ms.
 * @themeKey ais-SearchBox - the root div of the widget
 * @themeKey ais-SearchBox-form - the wrapping form
 * @themeKey ais-SearchBox-input - the search input
 * @themeKey ais-SearchBox-submit - the submit button
 * @themeKey ais-SearchBox-submitIcon - the default magnifier icon used with the search input
 * @themeKey ais-SearchBox-reset - the reset button used to clear the content of the input
 * @themeKey ais-SearchBox-resetIcon - the default reset icon used inside the reset button
 * @themeKey ais-SearchBox-loadingIndicator - the loading indicator container
 * @themeKey ais-SearchBox-loadingIcon - the default loading icon
 * @translationkey submitTitle - The submit button title
 * @translationkey resetTitle - The reset button title
 * @translationkey placeholder - The label of the input placeholder
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <SearchBox />
 *   </InstantSearch>
 * );
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__["default"])(_components_SearchBox_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  $$widgetType: 'ais.searchBox'
}));

/***/ }),

/***/ "./node_modules/react-instantsearch-dom/dist/es/widgets/Snippet.js":
/*!*************************************************************************!*\
  !*** ./node_modules/react-instantsearch-dom/dist/es/widgets/Snippet.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-instantsearch-core */ "./node_modules/react-instantsearch-core/dist/es/connectors/connectHighlight.js");
/* harmony import */ var _components_Snippet_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Snippet.js */ "./node_modules/react-instantsearch-dom/dist/es/components/Snippet.js");



/**
 * Renders any attribute from an hit into its highlighted snippet form when relevant.
 *
 * Read more about it in the [Highlighting results](guide/Highlighting_results.html) guide.
 * @name Snippet
 * @kind widget
 * @requirements To use this widget, the attribute name passed to the `attribute` prop must be
 * present in "Attributes to snippet" on the Algolia dashboard or configured as `attributesToSnippet`
 * via a set settings call to the Algolia API.
 * @propType {string} attribute - location of the highlighted snippet attribute in the hit (the corresponding element can be either a string or an array of strings)
 * @propType {object} hit - hit object containing the highlighted snippet attribute
 * @propType {string} [tagName='em'] - tag to be used for highlighted parts of the attribute
 * @propType {string} [nonHighlightedTagName='span'] - tag to be used for the parts of the hit that are not highlighted
 * @propType {node} [separator=',<space>'] - symbol used to separate the elements of the array in case the attribute points to an array of strings.
 * @themeKey ais-Snippet - the root span of the widget
 * @themeKey ais-Snippet-highlighted - the highlighted text
 * @themeKey ais-Snippet-nonHighlighted - the normal text
 * @example
 * import React from 'react';
 * import algoliasearch from 'algoliasearch/lite';
 * import { InstantSearch, SearchBox, Hits, Snippet } from 'react-instantsearch-dom';
 *
 * const searchClient = algoliasearch(
 *   'latency',
 *   '6be0576ff61c053d5f9a3225e2a90f76'
 * );
 *
 * const Hit = ({ hit }) => (
 *   <div>
 *     <Snippet attribute="description" hit={hit} />
 *   </div>
 * );
 *
 * const App = () => (
 *   <InstantSearch
 *     searchClient={searchClient}
 *     indexName="instant_search"
 *   >
 *     <SearchBox defaultRefinement="adjustable" />
 *     <Hits hitComponent={Hit} />
 *   </InstantSearch>
 * );
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_instantsearch_core__WEBPACK_IMPORTED_MODULE_0__["default"])(_components_Snippet_js__WEBPACK_IMPORTED_MODULE_1__["default"], {
  $$widgetType: 'ais.snippet'
}));

/***/ }),

/***/ "./src/assets/images/hike-with-gravity-logo.jpg":
/*!******************************************************!*\
  !*** ./src/assets/images/hike-with-gravity-logo.jpg ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/hike-with-gravity-logo-c40985ecb808a33796150447dfea4a9f.jpg");

/***/ }),

/***/ "./src/components/Footer/creative_commons.svg":
/*!****************************************************!*\
  !*** ./src/components/Footer/creative_commons.svg ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnCiAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgeG1sbnM6Y2M9Imh0dHA6Ly93ZWIucmVzb3VyY2Uub3JnL2NjLyIKICAgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHdpZHRoPSI4MCIKICAgaGVpZ2h0PSIxNSIKICAgaWQ9InN2ZzIyNzkiCiAgIHNvZGlwb2RpOnZlcnNpb249IjAuMzIiCiAgIGlua3NjYXBlOnZlcnNpb249IjAuNDUrZGV2ZWwiCiAgIHZlcnNpb249IjEuMCIKICAgc29kaXBvZGk6ZG9jbmFtZT0iYnktbmMuc3ZnIgogICBpbmtzY2FwZTpvdXRwdXRfZXh0ZW5zaW9uPSJvcmcuaW5rc2NhcGUub3V0cHV0LnN2Zy5pbmtzY2FwZSI+CiAgPGRlZnMKICAgICBpZD0iZGVmczIyODEiPgogICAgPGNsaXBQYXRoCiAgICAgICBjbGlwUGF0aFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgIGlkPSJjbGlwUGF0aDM0NDIiPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjkyMjQzNTM0O3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0MzQ0NCIKICAgICAgICAgd2lkdGg9IjIwLjYxNDA1OCIKICAgICAgICAgaGVpZ2h0PSIxMi40ODM3MDMiCiAgICAgICAgIHg9IjE3MS45OTgzMiIKICAgICAgICAgeT0iMjM5LjEyMDMiIC8+CiAgICA8L2NsaXBQYXRoPgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjOTk5OTk5IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAwMDAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAuMCIKICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnpvb209IjEwLjUxMjUiCiAgICAgaW5rc2NhcGU6Y3g9IjQwIgogICAgIGlua3NjYXBlOmN5PSI3LjUiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9ImxheWVyMSIKICAgICB3aWR0aD0iODBweCIKICAgICBoZWlnaHQ9IjE1cHgiCiAgICAgc2hvd2JvcmRlcj0idHJ1ZSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iZmFsc2UiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSI5MzUiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNjI0IgogICAgIGlua3NjYXBlOndpbmRvdy14PSI1MCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMTYwIiAvPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTIyODQiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgIDwvY2M6V29yaz4KICAgIDwvcmRmOlJERj4KICA8L21ldGFkYXRhPgogIDxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj4KICAgIDxnCiAgICAgICBpZD0iQlktTkMiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjk4NzUwMTksMCwwLDAuOTMzMzUxOCwtMzIzLjkwMDY0LC0zMDIuNjc3NDkpIj4KICAgICAgPGcKICAgICAgICAgaWQ9ImczNzExIgogICAgICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTgsODcpIj4KICAgICAgICA8cmVjdAogICAgICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEuMDQxNjE3NjM7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmU7c3Ryb2tlLW9wYWNpdHk6MSIKICAgICAgICAgICBpZD0icmVjdDM3MTMiCiAgICAgICAgICAgd2lkdGg9IjgwIgogICAgICAgICAgIGhlaWdodD0iMTUiCiAgICAgICAgICAgeD0iMTcwLjUiCiAgICAgICAgICAgeT0iMjM3Ljg2MjE4IiAvPgogICAgICAgIDxyZWN0CiAgICAgICAgICAgeT0iMjM5LjM2MjE4IgogICAgICAgICAgIHg9IjE3MiIKICAgICAgICAgICBoZWlnaHQ9IjEyIgogICAgICAgICAgIHdpZHRoPSI3NyIKICAgICAgICAgICBpZD0icmVjdDM3MTUiCiAgICAgICAgICAgc3R5bGU9ImZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC45MjI0MzUzNDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eToxIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgc3R5bGU9ImZpbGw6I2FiYjFhYTtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZTtzdHJva2Utb3BhY2l0eTowLjQ2OTEzNTc4IgogICAgICAgICAgIGQ9Ik0gMTcxLjk5OTk2LDIzOS4zNzUwNSBMIDE3MS45OTk5NiwyNTEuMzc1MDUgTCAxOTIuMzM0NzQsMjUxLjM3NTA1IEMgMTkzLjY0MzM5LDI0OS42MjQ3NCAxOTQuNTI2NTIsMjQ3LjU5MDU3IDE5NC41MjY1MiwyNDUuMzc1MDUgQyAxOTQuNTI2NTIsMjQzLjE3NDMxIDE5My42NTg1OSwyNDEuMTE3OSAxOTIuMzY1OTksMjM5LjM3NTA1IEwgMTcxLjk5OTk2LDIzOS4zNzUwNSB6IgogICAgICAgICAgIGlkPSJwYXRoMzcxNyIKICAgICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY3NjYyIgLz4KICAgICAgICA8ZwogICAgICAgICAgIGlkPSJnMzcxOSIKICAgICAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjk2MTI1MzMsMCwwLDAuOTYxMjUzMyw2LjgzNDE1NjYsOS41MDY5OTk0KSIKICAgICAgICAgICBjbGlwLXBhdGg9InVybCgjY2xpcFBhdGgzNDQyKSI+CiAgICAgICAgICA8cGF0aAogICAgICAgICAgICAgaWQ9InBhdGgzNzIxIgogICAgICAgICAgICAgY3g9IjI5Ni4zNTQxNiIKICAgICAgICAgICAgIHJ5PSIyMi45Mzk1NDgiCiAgICAgICAgICAgICBjeT0iMjY0LjM1NzciCiAgICAgICAgICAgICB0eXBlPSJhcmMiCiAgICAgICAgICAgICByeD0iMjIuOTM5NTQ4IgogICAgICAgICAgICAgZD0iTSAxOTAuMDY0MTcsMjQ1LjM2MjA2IEMgMTkwLjA2NjY3LDI0OS4yNTQwNSAxODYuOTEzMjYsMjUyLjQxMDcyIDE4My4wMjE1MywyNTIuNDEzMjMgQyAxNzkuMTI5NzksMjUyLjQxNTcyIDE3NS45NzI2MiwyNDkuMjYyNTYgMTc1Ljk3MDM2LDI0NS4zNzA2IEMgMTc1Ljk3MDM2LDI0NS4zNjc4MyAxNzUuOTcwMzYsMjQ1LjM2NTA3IDE3NS45NzAzNiwyNDUuMzYyMDYgQyAxNzUuOTY4MSwyNDEuNDcwMDcgMTc5LjEyMTI2LDIzOC4zMTM0IDE4My4wMTMsMjM4LjMxMTEzIEMgMTg2LjkwNTI0LDIzOC4zMDg2NCAxOTAuMDYxOTEsMjQxLjQ2MTgxIDE5MC4wNjQxNywyNDUuMzUzOCBDIDE5MC4wNjQxNywyNDUuMzU2MjggMTkwLjA2NDE3LDI0NS4zNTkyOSAxOTAuMDY0MTcsMjQ1LjM2MjA2IHoiCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2ZmZmZmZiIgLz4KICAgICAgICAgIDxwYXRoCiAgICAgICAgICAgICBkPSJNIDE4OC43NDU3NiwyMzkuNjIyMjYgQyAxOTAuMzA4NDMsMjQxLjE4NDkyIDE5MS4wODk4OCwyNDMuMDk4NjkgMTkxLjA4OTg4LDI0NS4zNjIwNiBDIDE5MS4wODk4OCwyNDcuNjI1OTIgMTkwLjMyMTk3LDI0OS41MTkxMyAxODguNzg2MTUsMjUxLjA0MTY1IEMgMTg3LjE1NjI3LDI1Mi42NDUyMSAxODUuMjI5OTUsMjUzLjQ0NjcyIDE4My4wMDcyMiwyNTMuNDQ2NzIgQyAxODAuODExMzIsMjUzLjQ0NjcyIDE3OC45MTgzNywyNTIuNjUxNzIgMTc3LjMyODg3LDI1MS4wNjE3NCBDIDE3NS43MzkxMiwyNDkuNDcxOTggMTc0Ljk0NDM2LDI0Ny41NzIyNiAxNzQuOTQ0MzYsMjQ1LjM2MjA2IEMgMTc0Ljk0NDM2LDI0My4xNTIzNSAxNzUuNzM5MTIsMjQxLjIzOTA4IDE3Ny4zMjg4NywyMzkuNjIyMjYgQyAxNzguODc3OTksMjM4LjA1OTEgMTgwLjc3MDk0LDIzNy4yNzc2NCAxODMuMDA3MjIsMjM3LjI3NzY0IEMgMTg1LjI3MDYsMjM3LjI3NzY0IDE4Ny4xODMxMiwyMzguMDU5MDkgMTg4Ljc0NTc2LDIzOS42MjIyNiB6IE0gMTc4LjM4MDkzLDI0MC42NzM1NSBDIDE3Ny4wNTk3OCwyNDIuMDA4IDE3Ni4zOTk0NSwyNDMuNTcxMTYgMTc2LjM5OTQ1LDI0NS4zNjQyOSBDIDE3Ni4zOTk0NSwyNDcuMTU2OTQgMTc3LjA1MzI2LDI0OC43MDY4MiAxNzguMzYwNjIsMjUwLjAxMzkzIEMgMTc5LjY2ODIyLDI1MS4zMjE1MyAxODEuMjI0ODcsMjUxLjk3NTA5IDE4My4wMzEwNSwyNTEuOTc1MDkgQyAxODQuODM3MjQsMjUxLjk3NTA5IDE4Ni40MDcxNiwyNTEuMzE1MDIgMTg3Ljc0MTYxLDI0OS45OTQxMiBDIDE4OS4wMDg2LDI0OC43NjcyNSAxODkuNjQyMzQsMjQ3LjIyNDY3IDE4OS42NDIzNCwyNDUuMzY0MjkgQyAxODkuNjQyMzQsMjQzLjUxNzk5IDE4OC45OTgzMSwyNDEuOTUwODQgMTg3LjcxMTAxLDI0MC42NjM1NCBDIDE4Ni40MjM5NiwyMzkuMzc2NDkgMTg0Ljg2NDA2LDIzOC43MzI3IDE4My4wMzEwNSwyMzguNzMyNyBDIDE4MS4xOTgwNCwyMzguNzMyNzEgMTc5LjY0NzY3LDIzOS4zNzk3NSAxNzguMzgwOTMsMjQwLjY3MzU1IHogTSAxODEuODU3NjEsMjQ0LjU3NTU5IEMgMTgxLjY1NTczLDI0NC4xMzU0NSAxODEuMzUzNTQsMjQzLjkxNTI1IDE4MC45NTA1MSwyNDMuOTE1MjUgQyAxODAuMjM4MDIsMjQzLjkxNTI1IDE3OS44ODE5LDI0NC4zOTUwMSAxNzkuODgxOSwyNDUuMzU0MDQgQyAxNzkuODgxOSwyNDYuMzEzMjggMTgwLjIzODAyLDI0Ni43OTI1NSAxODAuOTUwNTEsMjQ2Ljc5MjU1IEMgMTgxLjQyMSwyNDYuNzkyNTUgMTgxLjc1NzA1LDI0Ni41NTkwOCAxODEuOTU4NjksMjQ2LjA5MTExIEwgMTgyLjk0NjI5LDI0Ni42MTcwMSBDIDE4Mi40NzU1NSwyNDcuNDUzMzkgMTgxLjc2OTM0LDI0Ny44NzE2OCAxODAuODI3NjMsMjQ3Ljg3MTY4IEMgMTgwLjEwMTM2LDI0Ny44NzE2OCAxNzkuNTE5NTMsMjQ3LjY0ODk5IDE3OS4wODI2NSwyNDcuMjA0MDkgQyAxNzguNjQ1MDIsMjQ2Ljc1ODcgMTc4LjQyNjg0LDI0Ni4xNDQ3NyAxNzguNDI2ODQsMjQ1LjM2MjA2IEMgMTc4LjQyNjg0LDI0NC41OTMxMyAxNzguNjUyMDQsMjQzLjk4MjcxIDE3OS4xMDI3MSwyNDMuNTMwNTYgQyAxNzkuNTUzMzgsMjQzLjA3ODM4IDE4MC4xMTQ2MywyNDIuODUyNCAxODAuNzg3NSwyNDIuODUyNCBDIDE4MS43ODI4OCwyNDIuODUyNCAxODIuNDk1NjEsMjQzLjI0NDY1IDE4Mi45MjY0NywyNDQuMDI4MzUgTCAxODEuODU3NjEsMjQ0LjU3NTU5IHogTSAxODYuNTAzOTgsMjQ0LjU3NTU5IEMgMTg2LjMwMTg0LDI0NC4xMzU0NSAxODYuMDA1NjcsMjQzLjkxNTI1IDE4NS42MTUxNywyNDMuOTE1MjUgQyAxODQuODg4MzksMjQzLjkxNTI1IDE4NC41MjQ3NCwyNDQuMzk1MDEgMTg0LjUyNDc0LDI0NS4zNTQwNCBDIDE4NC41MjQ3NCwyNDYuMzEzMjggMTg0Ljg4ODM5LDI0Ni43OTI1NSAxODUuNjE1MTcsMjQ2Ljc5MjU1IEMgMTg2LjA4NjQyLDI0Ni43OTI1NSAxODYuNDE2NDQsMjQ2LjU1OTA4IDE4Ni42MDQ4LDI0Ni4wOTExMSBMIDE4Ny42MTQ0NywyNDYuNjE3MDEgQyAxODcuMTQ0NDgsMjQ3LjQ1MzM5IDE4Ni40MzkyNiwyNDcuODcxNjggMTg1LjQ5OTMxLDI0Ny44NzE2OCBDIDE4NC43NzQwMywyNDcuODcxNjggMTg0LjE5MzQ2LDI0Ny42NDg5OSAxODMuNzU2ODMsMjQ3LjIwNDA5IEMgMTgzLjMyMDk2LDI0Ni43NTg3IDE4My4xMDI1NCwyNDYuMTQ0NzcgMTgzLjEwMjU0LDI0NS4zNjIwNiBDIDE4My4xMDI1NCwyNDQuNTkzMTMgMTgzLjMyNDIyLDI0My45ODI3MSAxODMuNzY3MzcsMjQzLjUzMDU2IEMgMTg0LjIxMDI2LDI0My4wNzgzOCAxODQuNzc0MDQsMjQyLjg1MjQgMTg1LjQ1OTIsMjQyLjg1MjQgQyAxODYuNDUyODIsMjQyLjg1MjQgMTg3LjE2NDU1LDI0My4yNDQ2NSAxODcuNTkzOSwyNDQuMDI4MzUgTCAxODYuNTAzOTgsMjQ0LjU3NTU5IHoiCiAgICAgICAgICAgICBpZD0icGF0aDM3MjMiCiAgICAgICAgICAgICBzdHlsZT0ib3BhY2l0eToxIiAvPgogICAgICAgIDwvZz4KICAgICAgPC9nPgogICAgICA8cGF0aAogICAgICAgICBpZD0idGV4dDM3MjUiCiAgICAgICAgIGQ9Ik0gMzU3LjQxOTcsMzMxLjY4NTAyIEMgMzU3LjY2NTE4LDMzMS42ODUwMiAzNTcuODUxMzEsMzMxLjYzMTQ0IDM1Ny45NzgxLDMzMS41MjQyNyBDIDM1OC4xMDQ4OCwzMzEuNDE3MSAzNTguMTY4MjcsMzMxLjI1OTA0IDM1OC4xNjgyOCwzMzEuMDUwMDUgQyAzNTguMTY4MjcsMzMwLjg0Mzc3IDM1OC4xMDQ4OCwzMzAuNjg3MDMgMzU3Ljk3ODEsMzMwLjU3OTg2IEMgMzU3Ljg1MTMxLDMzMC40NzAwMiAzNTcuNjY1MTgsMzMwLjQxNTA5IDM1Ny40MTk3LDMzMC40MTUwOSBMIDM1Ni41NTc4NCwzMzAuNDE1MDkgTCAzNTYuNTU3ODQsMzMxLjY4NTAyIEwgMzU3LjQxOTcsMzMxLjY4NTAyIE0gMzU3LjQ3MjMsMzM0LjMwOTI2IEMgMzU3Ljc4NTIyLDMzNC4zMDkyNiAzNTguMDE5OSwzMzQuMjQzNjMgMzU4LjE3NjM3LDMzNC4xMTIzNSBDIDM1OC4zMzU1MiwzMzMuOTgxMDcgMzU4LjQxNTEsMzMzLjc4MjggMzU4LjQxNTEsMzMzLjUxNzU3IEMgMzU4LjQxNTEsMzMzLjI1NzY5IDM1OC4zMzY4NiwzMzMuMDYzNDYgMzU4LjE4MDQxLDMzMi45MzQ4NSBDIDM1OC4wMjM5NiwzMzIuODAzNTggMzU3Ljc4NzkyLDMzMi43Mzc5MyAzNTcuNDcyMywzMzIuNzM3OTMgTCAzNTYuNTU3ODQsMzMyLjczNzkzIEwgMzU2LjU1Nzg0LDMzNC4zMDkyNiBMIDM1Ny40NzIzLDMzNC4zMDkyNiBNIDM1OC45MjA4OSwzMzIuMTUxMTkgQyAzNTkuMjU1MzgsMzMyLjI0NzY1IDM1OS41MTQzNCwzMzIuNDI1ODEgMzU5LjY5Nzc5LDMzMi42ODU2OSBDIDM1OS44ODEyMSwzMzIuOTQ1NTcgMzU5Ljk3MjkzLDMzMy4yNjQzOSAzNTkuOTcyOTQsMzMzLjY0MjE1IEMgMzU5Ljk3MjkzLDMzNC4yMjA4NSAzNTkuNzc2LDMzNC42NTIyIDM1OS4zODIxNywzMzQuOTM2MTkgQyAzNTguOTg4MzMsMzM1LjIyMDE4IDM1OC4zODk0NywzMzUuMzYyMTggMzU3LjU4NTYsMzM1LjM2MjE4IEwgMzU1LjAwMDAxLDMzNS4zNjIxOCBMIDM1NS4wMDAwMSwzMjkuMzYyMTggTCAzNTcuMzM4NzgsMzI5LjM2MjE4IEMgMzU4LjE3NzcxLDMyOS4zNjIxOCAzNTguNzg0NjYsMzI5LjQ4ODExIDM1OS4xNTk2MiwzMjkuNzM5OTQgQyAzNTkuNTM3MjcsMzI5Ljk5MTc4IDM1OS43MjYxLDMzMC4zOTUgMzU5LjcyNjEsMzMwLjk0OTU4IEMgMzU5LjcyNjEsMzMxLjI0MTYyIDM1OS42NTczMiwzMzEuNDkwNzggMzU5LjUxOTc1LDMzMS42OTcwOCBDIDM1OS4zODIxNywzMzEuOTAwNyAzNTkuMTgyNTUsMzMyLjA1MjA3IDM1OC45MjA4OSwzMzIuMTUxMTkgTSAzNTkuODM3NDYsMzI5LjM2MjE4IEwgMzYxLjU0MDk2LDMyOS4zNjIxOCBMIDM2Mi45MTY3MSwzMzEuNTAwMTUgTCAzNjQuMjkyNDUsMzI5LjM2MjE4IEwgMzY2LDMyOS4zNjIxOCBMIDM2My42OTc2NCwzMzIuODM0MzggTCAzNjMuNjk3NjQsMzM1LjM2MjE4IEwgMzYyLjEzOTgyLDMzNS4zNjIxOCBMIDM2Mi4xMzk4MiwzMzIuODM0MzggTCAzNTkuODM3NDYsMzI5LjM2MjE4IE0gMzY1LjE1ODM3LDMzMi40MDgzOSBMIDM2Ny42OTk0NiwzMzIuNDA4MzkgTCAzNjcuNjk5NDYsMzMzLjU3Nzg1IEwgMzY1LjE1ODM3LDMzMy41Nzc4NSBMIDM2NS4xNTgzNywzMzIuNDA4MzkgTSAzNjguOTE3NCwzMjkuMzYyMTggTCAzNzAuNjU3MzIsMzI5LjM2MjE4IEwgMzcyLjg1NDQ3LDMzMy40NzczOCBMIDM3Mi44NTQ0NywzMjkuMzYyMTggTCAzNzQuMzMxMzgsMzI5LjM2MjE4IEwgMzc0LjMzMTM4LDMzNS4zNjIxOCBMIDM3Mi41OTE0NiwzMzUuMzYyMTggTCAzNzAuMzk0MywzMzEuMjQ2OTggTCAzNzAuMzk0MywzMzUuMzYyMTggTCAzNjguOTE3NCwzMzUuMzYyMTggTCAzNjguOTE3NCwzMjkuMzYyMTggTSAzODAuNjUxNzMsMzM1LjAzMjY0IEMgMzgwLjM2NTc5LDMzNS4xNzk5OSAzODAuMDY3NywzMzUuMjkxMTggMzc5Ljc1NzQ5LDMzNS4zNjYxOSBDIDM3OS40NDcyNywzMzUuNDQxMjIgMzc5LjEyMzU3LDMzNS40Nzg3MiAzNzguNzg2MzgsMzM1LjQ3ODcyIEMgMzc3Ljc4MDE5LDMzNS40Nzg3MiAzNzYuOTgzMDcsMzM1LjIwMDA5IDM3Ni4zOTUsMzM0LjY0MjgyIEMgMzc1LjgwNjkzLDMzNC4wODI4OCAzNzUuNTEyOSwzMzMuMzI0NjcgMzc1LjUxMjksMzMyLjM2ODIxIEMgMzc1LjUxMjksMzMxLjQwOTA3IDM3NS44MDY5MywzMzAuNjUwODcgMzc2LjM5NSwzMzAuMDkzNiBDIDM3Ni45ODMwNywzMjkuNTMzNjUgMzc3Ljc4MDE5LDMyOS4yNTM2OCAzNzguNzg2MzgsMzI5LjI1MzY3IEMgMzc5LjEyMzU3LDMyOS4yNTM2OCAzNzkuNDQ3MjcsMzI5LjI5MTE4IDM3OS43NTc0OSwzMjkuMzY2MiBDIDM4MC4wNjc3LDMyOS40NDEyMiAzODAuMzY1NzksMzI5LjU1MjQxIDM4MC42NTE3MywzMjkuNjk5NzUgTCAzODAuNjUxNzMsMzMwLjk0MTU1IEMgMzgwLjM2MzA5LDMzMC43NDU5NyAzODAuMDc4NSwzMzAuNjAyNjMgMzc5Ljc5Nzk2LDMzMC41MTE1NCBDIDM3OS41MTc0LDMzMC40MjA0NiAzNzkuMjIyMDMsMzMwLjM3NDkxIDM3OC45MTE4MSwzMzAuMzc0OSBDIDM3OC4zNTYxMSwzMzAuMzc0OTEgMzc3LjkxOTExLDMzMC41NTE3NCAzNzcuNjAwOCwzMzAuOTA1MzggQyAzNzcuMjgyNDksMzMxLjI1OTA0IDM3Ny4xMjMzMywzMzEuNzQ2NjUgMzc3LjEyMzMzLDMzMi4zNjgyMSBDIDM3Ny4xMjMzMywzMzIuOTg3MSAzNzcuMjgyNDksMzMzLjQ3MzM2IDM3Ny42MDA4LDMzMy44MjcwMSBDIDM3Ny45MTkxMSwzMzQuMTgwNjYgMzc4LjM1NjExLDMzNC4zNTc0OSAzNzguOTExODEsMzM0LjM1NzQ5IEMgMzc5LjIyMjAzLDMzNC4zNTc0OSAzNzkuNTE3NCwzMzQuMzExOTQgMzc5Ljc5Nzk2LDMzNC4yMjA4NSBDIDM4MC4wNzg1LDMzNC4xMjk3NiAzODAuMzYzMDksMzMzLjk4NjQzIDM4MC42NTE3MywzMzMuNzkwODUgTCAzODAuNjUxNzMsMzM1LjAzMjY0IgogICAgICAgICBzdHlsZT0iZm9udC1zaXplOjguMjU4NTg3ODRweDtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpib2xkO2ZpbGw6I2ZmZmZmZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MXB4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZS1vcGFjaXR5OjE7Zm9udC1mYW1pbHk6J0JpdHN0cmVhbSBWZXJhIFNhbnMnIiAvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==");

/***/ }),

/***/ "./src/components/Footer/footer_logo.svg":
/*!***********************************************!*\
  !*** ./src/components/Footer/footer_logo.svg ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/footer_logo-00929bd0b0316a8541903a168b5052cc.svg");

/***/ }),

/***/ "./src/components/Logo/logo.svg":
/*!**************************************!*\
  !*** ./src/components/Logo/logo.svg ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/logo-a395656398b6c7255c88b2a377dfe1fd.svg");

/***/ }),

/***/ "./.cache/caches/gatsby-plugin-image/4021310346.json":
/*!***********************************************************!*\
  !*** ./.cache/caches/gatsby-plugin-image/4021310346.json ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"layout":"constrained","backgroundColor":"#a8e8f8","images":{"fallback":{"src":"/static/6e6d3fab459aa63a426fdd14d71d76c2/a2a89/weminunche-wilderness_chicago-basin.jpg","srcSet":"/static/6e6d3fab459aa63a426fdd14d71d76c2/0c1e2/weminunche-wilderness_chicago-basin.jpg 925w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/05efa/weminunche-wilderness_chicago-basin.jpg 1851w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/a2a89/weminunche-wilderness_chicago-basin.jpg 3701w","sizes":"(min-width: 3701px) 3701px, 100vw"},"sources":[{"srcSet":"/static/6e6d3fab459aa63a426fdd14d71d76c2/08d1d/weminunche-wilderness_chicago-basin.webp 925w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/d8359/weminunche-wilderness_chicago-basin.webp 1851w,\\n/static/6e6d3fab459aa63a426fdd14d71d76c2/e5a7b/weminunche-wilderness_chicago-basin.webp 3701w","type":"image/webp","sizes":"(min-width: 3701px) 3701px, 100vw"}]},"width":3701,"height":1041}');

/***/ }),

/***/ "./public/page-data/sq/d/764694655.json":
/*!**********************************************!*\
  !*** ./public/page-data/sq/d/764694655.json ***!
  \**********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"data":{"site":{"siteMetadata":{"title":"Hike with Gravity","description":"The hiking journal of Jim \'Gravity\' Smith, a Triple Crown thru-hikers (Appalachian Trail 2017, Pacific Crest Trail 2019, and Continental Divide Trail 2021).","author":"Jim \'Gravity\' Smith","siteUrl":"https://hikewithgravity.com"}}}}');

/***/ })

};
;
//# sourceMappingURL=component---src-pages-search-js.js.map