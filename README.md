# nilsleter
A jQuery plugin for create newsletter subscription automatically and send data to a end-point by Ajax.

** Dependencies **

The plugin require [Twitter Bootstrap](https://github.com/twbs/bootstrap) and [jQuery md5](https://gist.github.com/thanashyam/2309671).

## Installation
Include script's after the jQuery library (prefer before `</body>` tag).

```
 <script src="/path/to/bootstrap.min.js"></script>
 <script src="/path/to/jquery.md5.js"></script>
 <script src="/path/to/jquery.nilsleter.js"></script>
```

## Usage
Include any element in page, for example:

```
 <div id="integration-form"></div>
```

Then call the plugin, after all `<script>` tags:

```
 <script>
   $("#integration-form").nilsleter({
     modal:  false,
     fields: { 
       estado: ['PR','SC','SP','RS'], 
       nivel:  ['Iniciante','Intermediário','Avançado','Ninja']
     }
   });
 </script>
```

## Options

###options.modal

| Value        | Description           |
| ------------- |-------------|
| `false` (default)     | Form inline on page      |
| `true`      | Button on page for the open modal with form |

###options.estado

Array with the location for the user select.

Default: `['PR','SC','SP','RS']`

###options.nivel

Array with the level for the user select.

Default: `['Iniciante','Intermediário','Avançado','Ninja']`

## Additional Notes

Thanks to the [jQuery Boilerplate](https://github.com/jquery-boilerplate/jquery-boilerplate) project.


