'use strict';

const Provider = require('butter-provider');
const path = require('path');
const os = require('os');
const debug = require('debug')('butter-provider-local')
const paths = ['/foo/bar'];

var Parser = require('local-video-library');

const defaultConfig = {
    name: 'lvl',
    uniqueId: 'imdb_id',
    tabName: 'LocalVideoLibrary',
    filters: {
        sorters: {
            popularity: 'Popularity',
            updated: 'Updated',
            year: 'Year',
            alphabet: 'Alphabetical',
            rating: 'Rating'
        }
    },
    defaults: {
        traktId: '647c69e4ed1ad13393bf6edd9d8f9fb6fe9faf405b44320a6b71ab960b4540a2',
        pathList: ['~/Downloads'],
        debug: false
    },
    args: {
        traktId: Provider.ArgType.STRING,
        pathList: Provider.ArgType.ARRAY,
        debug: Provider.ArgType.BOOLEAN
    },
    /* should be removed */
    //subtitle: 'ysubs',
    metadata: 'trakttv:movie-metadata'
}

class LocalVideoProvider extends Provider {
    constructor(args, config = defaultConfig) {
        super(args, config);

        const paths = this.args.pathList.map((p) => (
            path.resolve(p.replace(/^~/, os.homedir()))
        ))

        this.library = new Parser(this.args.traktId,
                                  paths,
                                  this.args.debug);

        this.promise = this.library.scan(paths)
    }

    fetch (filters = {}, index = 0) {
        return this.promise
                   .then((localLibrary) => {
                       debug('results', localLibrary);
                       console.timeEnd('test');
                   })
    }

    detail(torrentId, oldData, debug, index = 0) {

    }

    random(index = 0) {

    }
}

module.exports = LocalVideoProvider;
