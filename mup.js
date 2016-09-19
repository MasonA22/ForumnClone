module.exports = {
    servers: {
        one: {
            host: '138.197.138.68',
            username: 'root',
            password: "SHaolinsoccer10",
            opts: {
                port: 80
            }
            // or leave blank for authenticate from ssh-agent
        }
    },

    meteor: {
        name: 'ForumLive',
        path: '../ForumLive',
        servers: {
            one: {}
        },
        buildOptions: {
            serverOnly: true,
        },
        env: {
            ROOT_URL: 'http://138.197.138.68/',
            MONGO_URL: 'mongodb://localhost/meteor'
        },

        //dockerImage: 'kadirahq/meteord'
        deployCheckWaitTime: 60
    },

    mongo: {
        oplog: true,
        port: 27017,
        servers: {
            one: {},
        },      
    },
};