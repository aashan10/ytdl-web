<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Download Youtube Videos</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q=" crossorigin="anonymous" />
    </head>
    <body class="ui inverted">
        <style>
            body, html {
                background-color : #0000000f !important;
            }
            p{
                color : #ffffff !important;
            }
        </style>
        <div id="app">
            
        </div>
        <script src="{{ asset('js/app.js') }}" ></script>
    </body>
</html>
