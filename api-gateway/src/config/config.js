const routes = [
	{
		route: "/auth",
		container: "auth_service",
		protected: false
	},{
		route: "/prices/",
		container: "prices_service",
		protected: false
	},{
		route: "/users",
		container: "users_service",
		protected: false
	},
]

const serverSettings = {
	port: process.env.PORT || 7080
}

module.exports = { routes, serverSettings }
