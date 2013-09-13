
# Cloudup CLI

  The cloudup cli `up(1)` allows you to upload files to the cloud with ease.

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

## Tips

  Stream and item links that output to stdout may be opened
  in the browser by holding down __command__ and double-clicking
  the url.
