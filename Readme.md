
# Cloudup CLI

  The cloudup cli `up(1)` allows you to upload files to the cloud with ease.

  ![Cloudup cli](https://i.cloudup.com/tpBkHd8URl.gif)
  ![Cloudup interactive mode](https://i.cloudup.com/m8K8vVohPm.gif)

## Installation

  Install with npm:

```
$ npm install -g up
```

  Authenticate:

```
$ up config

  Cloudup up(1) one-time configuration requires your
  password, however it is transfered via https
  and is not stored locally. Subsequent operations
  use the auth token generated from this process.

  Username: tobi
  Password: ******

```

## Usage

```

  Usage: up [options] [file ...]

  Commands:

    open                   open matching stream
    copy                   copy matching stream's url
    streams                list streams
    config                 configure up(1)
    help [cmd]             display help for [cmd]

  Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -t, --title <name>    stream title name
    -s, --stream <id>     upload to the given stream
    -d, --direct          output direct links
    -f, --filename <str>  assign filename to stdin
    -T, --thumb-size <n>  thumbnail size in pixels [600]
 
```

## Examples

  Examples illustrating how to use the cloudup command-line tool
  to upload files and access your account.

### Uploading

  Upload a single file, the stream url is copied to your clipboard _immediately_
  for sharing, even before the upload has completed.

```
$ up reflection.png

 reflection.png : 92%
         stream : https://cloudup.com/cHFtYYeB8fJ
```

#### Multiple Files

  Upload several files at once by passing multiple filenames:

```
$ up simon-*.png

              simon-1.png : https://cloudup.com/iqd4NLa13ZV
              simon-2.png : https://cloudup.com/iCxBKJZAm36
              simon-3.png : https://cloudup.com/iEzTZXvVRYP
              simon-4.png : https://cloudup.com/iRYA6bLp70E
              simon-5.png : https://cloudup.com/ilMqsXxtTsV
              simon-6.png : https://cloudup.com/ilVngVMMeSd
              simon-7.png : https://cloudup.com/i1Tx8vkIbCC
              simon-8.png : https://cloudup.com/ifUKcaz5I3A
    simon-ball-ocean.png… : https://cloudup.com/iCA5N2PCJJS
    simon-ocean-stick-2.… : 71%
    simon-ocean-stick.pn… : 55%
          simon-ocean.png : 74%
                   stream : https://cloudup.com/c7WwhIwSl6Y
```

#### Thumbnails

 `up(1)` delivers thumbnails when possible before the files are uploaded, so viewers can
  see what they're getting before-hand, and progress is updated in real-time.

  ![cloudup cli simon photos](https://i.cloudup.com/jy3GcK9VpO-900x900.jpeg)

#### STDIN

  When no filenames are given `up(1)` reads from __stdin__:

```
$ echo 'hello world' | up
```

  A filename can be passed to help cloudup interpret the content:

```
$ echo 'hello __world__' | up --filename hello.md
```

#### Upload Options

  You may optionally provide a stream `--title` upon upload, otherwise Cloudup
  will generate one for you based on the content:

```
$ up ferrets/*.png --title Ferrets
```

  You may also upload to an existing stream by passing `--stream`:

```
$ up simon.png --stream c7WwhIwSl6Y
```

  If you prefer direct links you may use `--direct`:

```
$ up example.jpeg --direct

  example.jpeg : http://i.cloudup.com/uBuZVUk80lK/SXSc1V.jpeg
        stream : https://cloudup.com/c1rAycLAdHo
```

### Streams

  List your cloudup streams:

```
$ up streams 

                    Art (19) https://cloudup.com/cQD5fdgPrU1
                      C (2) https://cloudup.com/c4f5h12Ti1T
                   Cats (3) https://cloudup.com/cVeLe7dWdEH
        Cloudup - light (5) https://cloudup.com/ce4R6fdsQo
                Cluster (3) https://cloudup.com/cQJg8sdf7qO
                 Design (35) https://cloudup.com/c7nHCsd30hhF
  Dolphins intelligence (8) https://cloudup.com/c5Hy71w2fWe
                   EXIF (6) https://cloudup.com/coRcOdfXXiom
              Es6 yield (2) https://cloudup.com/cJWXLX1af2t

```

  Search for streams:

```
$ up streams australia

   Australia 2013 (63) https://cloudup.com/c_nzIQcjCWo

```

  Copy the first matching stream to the clipboard:

```
$ up copy australia
```

  Open the first matching stream in your default browser:

```
$ up open australia
```

### Interactive Mode

  The `-i` or `--interactive` flag may be used to list streams in an
  interactive list using the arrow keys to traverse the list. Pressing
  _return_ will open the stream or item in your default browser.

  The `up` / `down` arrows for navigating the list, and `left` / `right`
  to view the items or go back to the stream list.

  ![interactive mode](https://i.cloudup.com/m8K8vVohPm.gif)

## Tips

  Stream and item links that output to stdout may be opened
  in the browser by holding down __command__ and double-clicking
  the url.
