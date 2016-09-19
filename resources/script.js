var config={};

function authenticate(){
  Playground.authenticate(config);
}


function main(){
	Playground.notification.deliver({
		title: "Please wait...",
		message: "Connecting"
	});
  require.config({
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port: "") + config.prefix + "resources",
  });

  require(['js/qlik'], function(qlik) {
		Playground.notification.deliver({
			title: "Ready",
			message: "Connecting",
			duration: 200
		});
    qlik.setOnError( function ( error ) {
      console.log(error);
			Playground.notification.deliver({
				title: "Error",
				message: error
			});
    });
    console.log(qlik);
    var app = qlik.openApp(config.appname, config);
    console.log(app);
    app.model.waitForOpen.promise.then(function(){
       senseSearch.connectWithCapabilityAPI(app);
    });
  });

}
