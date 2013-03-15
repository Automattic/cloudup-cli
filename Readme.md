
# Cloudup CLI

  The cloudup cli `up(1)` allows you to upload files to the cloud with ease.

## Examples

  Uploading a single file:

```
$ up my.png

  package.json : https://cloudup.com/8bQSlwj72C/VRa6J55IV
    collection : https://cloudup.com/8bQSlwj72C

```

  Uploading multiple files:

```
$ up *.png

      droplet.png : 19%
     fat bird.png : 14%
         fire.png : 13%
          gem.png : 1%
 humming bird.png : 16%
   infrared-2.png : 22%
   infrared-3.png : 20%
   infrared-4.png : 2%
     infrared.png : 0%
         mist.png : 0%
    mountains.png : 0%
          owl.png : 0%
   reflection.png : 0%
  winter tree.png : 0%
       collection : https://cloudup.com/JIn2ViHcB

```

  Assigning a __title__ to the collection:

```
$ up albums/ferrets/*.png -t Ferrets
```

  Output __direct__ links to files instead of the item pages:

```
$ up ferrets/*.png -d

      tobi.png : http://i.cloudup.com/VRa6J55IV.png
      loki.png : http://i.cloudup.com/VRa6J55IV.png
      jane.png : http://i.cloudup.com/VRa6J55IV.png
      abby.png : http://i.cloudup.com/VRa6J55IV.png
    collection : https://cloudup.com/8bQSlwj72B

```

  Upload from __stdin__:

```
$ cat some.png | up
```


  Upload from __stdin__ with an item __title__:

```
$ cat some.png | up -t 'Cat Picture'
```


  Upload from __stdin__ with an item __title__ and __filename__:

```
$ git diff | up -t 'Awesome Diff' -f awesome.diff
```

  __JSON__ output:

```
$ up infrared*.png --json --title "Infrared Photos"

{
  "uid": "pDLCCKAnjL",
  "title": "Infrared Photos",
  "items": [
    {
      "uid": "fHWE8FMBmK",
      "title": "nfrared 2",
      "filename": "infrared-2.png",
      "updated_at": "2013-03-15T16:28:09.685Z",
      "created_at": "2013-03-15T16:28:09.685Z",
      "remote": "fHWE8FMBmK.png"
    },
    {
      "uid": "aQY6KVPxDM",
      "title": "nfrared 3",
      "filename": "infrared-3.png",
      "updated_at": "2013-03-15T16:28:09.651Z",
      "created_at": "2013-03-15T16:28:09.651Z",
      "remote": "aQY6KVPxDM.png"
    },
    {
      "uid": "bL5YnbjOHU",
      "title": "nfrared 4",
      "filename": "infrared-4.png",
      "updated_at": "2013-03-15T16:28:09.597Z",
      "created_at": "2013-03-15T16:28:09.597Z",
      "remote": "bL5YnbjOHU.png"
    },
    {
      "uid": "CihksaRXTB",
      "title": "nfrared",
      "filename": "infrared.png",
      "updated_at": "2013-03-15T16:28:09.664Z",
      "created_at": "2013-03-15T16:28:09.664Z",
      "remote": "CihksaRXTB.png"
    }
  ]
}
```

  Streaming __JSON__ output:

```
up --json-stream lib/*.js
[
  ["collection saved", {"uid":"hoogHRk95x","title":"Undefined","url":"https://cloudup.com/hoogHRk95x"}],
  ["item saved", {"uid":"s3ALkid6oU","title":"Lib console","filename":"lib/console.js","updated_at":"2013-03-15T16:34:13.217Z","created_at":"2013-03-15T16:34:13.217Z"}],
  ["item saved", {"uid":"iyXdLtihcK","title":"Lib json","filename":"lib/json.js","updated_at":"2013-03-15T16:34:13.240Z","created_at":"2013-03-15T16:34:13.240Z"}],
  ["item saved", {"uid":"0h30zHVZaj","title":"Lib json stream","filename":"lib/json-stream.js","updated_at":"2013-03-15T16:34:13.275Z","created_at":"2013-03-15T16:34:13.275Z"}],
  ["item progress", {"total":2900,"sent":2900,"remaining":0,"percent":100,"uid":"s3ALkid6oU"}],
  ["item progress", {"total":1216,"sent":1216,"remaining":0,"percent":100,"uid":"0h30zHVZaj"}],
  ["item progress", {"total":385,"sent":385,"remaining":0,"percent":100,"uid":"iyXdLtihcK"}],
  ["item uploaded", {"uid":"s3ALkid6oU","title":"Lib console","filename":"lib/console.js","updated_at":"2013-03-15T16:34:13.217Z","created_at":"2013-03-15T16:34:13.217Z","remote":"s3ALkid6oU.js"}],
  ["item uploaded", {"uid":"0h30zHVZaj","title":"Lib json stream","filename":"lib/json-stream.js","updated_at":"2013-03-15T16:34:13.275Z","created_at":"2013-03-15T16:34:13.275Z","remote":"0h30zHVZaj.js"}],
  ["item uploaded", {"uid":"iyXdLtihcK","title":"Lib json","filename":"lib/json.js","updated_at":"2013-03-15T16:34:13.240Z","created_at":"2013-03-15T16:34:13.240Z","remote":"iyXdLtihcK.js"}],
  ["end"]
]
```

## Tips

  Collection and item links that output to stdout may be opened
  in the browser by holding down __command__ and double-clicking
  the url.
