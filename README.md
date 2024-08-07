# theme-gradient
My take on adaptive color themes. 
Just a basic class right now that accepts 4 inputs
- dark color: this color with be used at solar midnight
- light color: this color will be used at solar noon
- longitude: need to calculate solar time
- offset: a number so the user can change the color over all

## How to use
It only works on the command line.
```
$ cd src
$ node main
```
#### Note the variables for color and stuff currently have to be modifyed manualy and directly in the source code.
#### The program only outputs the color in Hex format
