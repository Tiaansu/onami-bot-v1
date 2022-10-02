async function loadEvents(client) {
    const { 
        loadFiles
    } = require('../Functions/FileLoaderFunction');

    const {
        EventNamesText
    } = require('../Validations/EventsValidations');

    const Logger = require('../Functions/LoggerFunction');

    const ascii = require('ascii-table');
    const table = new ascii().setHeading("Events", "Status");

    await client.events.clear();

    const Files = await loadFiles("Events");
    Files.forEach((file) => {
        const event = require(file);

        const execute = (...args) => event.execute(...args, client);

        if (!EventNamesText.includes(event.name) || !event.name) {
            const L = file.split("/");
            table.addRow(`${`${L[7] + '/' + L[8] + '/' + L[9]}`}`, "🟥");
            return;
        }

        client.events.set(event.name, execute);

        if (event.rest) {
            if (event.once) 
                client.rest.on(event.name, execute);
            else
                client.rest.on(event.name, execute);
        } else {
            if (event.once)
                client.once(event.name, execute);
            else
                client.on(event.name, execute);
        }
        
        table.addRow(event.name, "🟩");
    })

    console.log(table.toString());
    return Logger.log(`Loaded Events.`);
}

module.exports = {
    loadEvents
}