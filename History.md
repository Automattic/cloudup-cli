
0.6.0 / 2013-11-10
==================

 * console: move the cursor relative to the origin
 * index: fix saveConfig() filename saving with a newline

0.5.2 / 2013-10-28
==================

 * fixed node v0.10.x exit bug (process exits cleanly now after upload)
 * switch to TooTallNate/ansi.js for ANSI escape codes
 * ensure that nobody using node < v0.6.0 can install (not supported)
 * fix uploading URL type items from the command line
 * use osenv.home() for the HOME dir (beginnings of Windows compat)
 * various other minor lint and whitespace fixes

0.5.1 / 2013-10-09
==================

 * resume stdin before calling .pipe()
 * display "help" when no arguments are passed and not piping

0.5.0 / 2013-09-05
==================

 * add up-open(1). Closes #32
 * add index support
 * add up-copy(1)
 * add copying of stream.url as soon as the stream is created
 * change: be less critical with errors
 * change ua to cloudup-cli
 * fix aggregate progress: use rows not cols
 * fix code thumbs: dont generate them :)

0.4.0 / 2013-08-28
==================

 * add clipboard copy support
 * refactor interactive output, remove urls here
 * make sure streams fit within the # of rows

0.3.0 / 2013-08-02
==================

 * add interactive stream listing support
 * add interactive item listing support
 * add oauth support
 * add -s, --stream <id> for adding to a stream
 * add up-config(1)
 * add aggregate progress for large #s of items. Closes #23
 * add up-streams(1)
 * remove --json and --json-stream

