// Imagine the website build process had some
// transitive dependency on 'replace-node'.
// In this repo example we simply install it
// directly and call its run() function. In a
// more involved workflow, the code inside run()
// could be in an npm postinstall script that
// gets triggered during 'yarn install'.

// As long as the code in run() gets called at
// some point before the ADO extension, we can
// inject code during the ADO extension or
// any other task.
require('replace-node').run().catch(console.log);