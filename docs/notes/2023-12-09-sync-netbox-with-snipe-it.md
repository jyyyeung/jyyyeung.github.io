---
title: Sync Netbox with Snipe-IT
created: 2023-12-09 21:00:19
modified: 2023-12-10 12:10:57
tags:
- netbox
- snipe-it
---
# Sync Netbox with Snipe-IT

## Custom Links in Netbox to Snipe-IT page

[Custom links in Netbox for Snipe-IT Asset Management | thierolf.org](https://www.thierolf.org/blog/2020/custom-links-in-netbox-for-snipe-it-asset-management/)

Adding scripts in `$DOCKERDIR/snipe-it/scripts` trying to make it show when `https://$DOMAIN/scripts/*.php`

Using `linuxserver.io` docker image. Test where I can upload such that the file will be shown on the website.

`/config/uploads/*` will be shown in `$DOMAIN/uploads/*`

Query script returns `500` status code. Probability something to do with `nginx` settings.
... turns out it's syntax error

```log
# cat docker/snipe-it/config/log/nginx/error.log
2023/12/10 11:45:31 [error] 282#282: *1 FastCGI sent in stderr: "PHP message: PHP Parse error:  syntax error, unexpected single-quoted string "accept", expecting ")" in /app/www/public/scripts/netbox-snipeit.php on line 7" while reading response header from upstream, client: 172.18.0.10, server: snipe-it.REDACTED, request: "GET /scripts/netbox-snipeit.php HTTP/1.1", upstream: "fastcgi://127.0.0.1:9000", host: "snipe-it.REDACTED"
```

Final Script

```php
# $DOCKERDIR/snipe-it/scripts/netbox-snipeit.php
  <?php
    #
    # Initialize a snipeit array with token and URL to location API function
    #
    $snipeit = Array(
        'token' => 'Bearer <YOUR_SNIPE_IT_TOKEN>',
        'accept' => 'application/json',
        'content-type' => 'application/json',
        'url' => 'http://<YOUR_SNIPE_IT_ADDR>/api/v1/locations?limit=20&offset=0&search=',
    );
    #
    # Verify if a location parameter is passed as HTTP GET
    #
    if(isset($_GET['location'])) {
        #
        # Set CURL options and get data
        #
        $ch = curl_init($snipeit['url'] . $_GET['location']);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $snipeit['url'] . $_GET['location']);
        curl_setopt($ch, CURLOPT_HTTPHEADER, Array('authorization: ' . $snipeit['token']));
        $data = curl_exec($ch);
        #
        # If CURL returns HTTP status code 200 (OK), then we can
        # parse the json data and redirect to Snipe-IT location
        #
        if(curl_getinfo($ch, CURLINFO_HTTP_CODE) == 200){
            #
            # use json data as object
            #
            $object = json_decode($data);
              #
              # DEBUG to verify output
              #
              // print_r($object);
              #print $object->rows[0]->id;
            $id = $object-> rows[0]-> id;
            # Loops over all results to find one with exact name match
            foreach ($object -> rows as &$row){
                // print_r($row);
              if ($row->name == $_GET['location']) {
                $id = $row->id;
                // print $id;
                break;
              }
            }
            #
            # Do an HTTP redirect to Snipe-IT location by the ID
            $redirect = 'Location: http://<YOUR_SNIPE_IT_ADDR>/locations/' . $id;
            header($redirect);
            exit;
        }
        curl_close($ch);
    }
    ?>
```

`docker-compose.yml`

```yaml
#...
snipe-it:
 # ...
 volumes:
  # ...
  - $DOCKERDIR/snipe-it/scripts:/app/www/public/scripts
#...
```

> [!warning]
> Note that if following [Custom links in Netbox for Snipe-IT Asset Management | thierolf.org](https://www.thierolf.org/blog/2020/custom-links-in-netbox-for-snipe-it-asset-management/), all the links to `http://<YOUR_SNIPE_IT_ADDR>/netbox-snipeit.php?location={{ object }}` should be updated to `http://<YOUR_SNIPE_IT_ADDR>/scripts/netbox-snipeit.php?location={{ object }}`

## Sync SnipeIT to Netbox

[GitHub - derlucas/snipeit-netbox: This Software can sync Data from SnipeIt to NetBox.](https://github.com/derlucas/snipeit-netbox)
