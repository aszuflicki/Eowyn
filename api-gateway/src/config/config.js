const routes = [
	// {
	// 	route: "/auth",
	// 	uri: "auth_service:",
	// 	protected: false
	// },
	{
		route: "/prices",
		uri: "prices_service:7001",
		protected: false
	}
	// ,{
	// 	route: "/users",
	// 	container: "users_service",
	// 	protected: false
	// },
]

const serverSettings = {
	port: process.env.PORT || 7081
}

module.exports = { routes, serverSettings }
