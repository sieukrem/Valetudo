const Valetudo = require("./lib/Valetudo");
const process = require("process");
const Logger = require("./lib/Logger");

var valetudo = new Valetudo();

async function shutdown() {
    try {
        await valetudo.shutdown();
        // need to exit here because otherwise the process would stay open
        process.exit(0);
    } catch (err) {
        Logger.error("Error occured: ",  err.name, " - ",err.message);
        Logger.error(err.stack);
        process.exit(1);
    }
}

// Signal termination handler - used if the process is killed
// (e.g. kill command, service valetudo stop, reboot (via upstart),...)
process.on("SIGTERM", shutdown);

// Signal interrupt handler - 
// e.g. if the process is aborted by Ctrl + C (during dev)
process.on("SIGINT", shutdown);

process.on("exit", function() {
    Logger.info("exiting...");
});
