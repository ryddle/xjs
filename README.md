# xjs.js

## WARNING: The framework is currently in an early development phase and many things could change or disappear in the future.

xjs is a personal JavaScript framework created based on my needs and my working style.
Although it is not intended for general use, I explain its structure and functionalities below.

## Structure

It consists of two parts:
* 1. Extension of base JavaScript and DOM objects (Element, HTMLElement, Node, CSSStyleDeclaration, String)
* 2. xjs class that defines various creation, selection and modification of elements functions as well as other string, math, array utilities.

To see an example of use, you can see the file index.html or see the functional demo at https://ryddle.github.io/xjs/index.html

## Functionalities

## DOM extensions

This document describes a JavaScript code that provides a set of utility functions to simplify DOM manipulation tasks. It extends core DOM functionality for a more convenient and readable approach.

**Key Features:**

* **Node Manipulation:**
    * `appendTo(node)`: Appends the current node as a child of the specified node.
    * `prependTo(node)`: Prepends the current node as a child of the specified node.
* **Event Binding:**
    * `bindEvent(evnt, method, scope, ...args)`: Binds an event listener to the current element.
    * `unbindEvent(evnt, scope)`: Unbinds an event listener from the current element (optional scope).
* **Document querying:**
    * `getElm(elm, queryType)`: Retrieves an element by ID, name, class, or tag name (default: ID).
* **Element properties and styles:**
    * `setAttribute(attribute, value)`: Sets an attribute on the current element.
    * `setAttributes(attributes)`: Sets multiple attributes using an object or array.
    * `getProperty(property)`: Gets the value of a property on the current element.
    * `setProperty(property, value)`: Sets the value of a property on the current element.
    * `setProperties(properties)`: Sets multiple properties using an object or array.
    * `setStyle(style)`: Sets multiple styles using an object.
    * `setStyleProperty(property, value)`: Sets the value of a specific style property.
    * `setStyles(styles)`: Sets multiple styles using an object or array.
    * `getStyleProperty(property, format)`: Gets the value of a style property (as a string or number).
* **Positioning:**
    * `pos(_x, _y, _xref, _yref)`: Positions the element using coordinates or relative positioning (optional reference points).
    * `left(_left)`: Sets or gets the left position of the element.
    * `right(_right)`: Sets or gets the right position of the element.
    * `top(_top)`: Sets or gets the top position of the element.
    * `bottom(_bottom)`: Sets or gets the bottom position of the element.
* **Size and dimensions:**
    * `setSize(_w, _h)`: Sets the width and height of the element.
    * `setWidth(width)`: Sets the width of the element.
    * `getWidth(asNumber = false)`: Gets the width of the element (as a string or number).
    * `setHeight(height)`: Sets the height of the element.
    * `getHeight(asNumber = false)`: Gets the height of the element (as a string or number).
* **Content:**
    * `setClass(classes)`: Sets the class attribute of the element.
    * `setText(text)`: Sets the text content of the element.
    * `getText()`: Gets the text content of the element.
    * `setHTML(html)`: Sets the HTML content of the element.
    * `getHTML()`: Gets the HTML content of the element.
* **Background:**
    * `bgColor(_bgcolor)`: Sets or gets the background color of the element.
    * `bg()`: The `bg` function is a method added to the `HTMLElement.prototype` object. It returns a new object that provides methods for manipulating the background of an HTML element.
        #### hex

        The `hex` method is a method of the object returned by the `bg` function. It allows you to set or get the background color of an HTML element.

        - Parameters:
        - `_h`: A string representing the hexadecimal color code.
        - Returns:
        - If `_h` is provided, it sets the background color of the HTML element to the specified color and returns the element.
        - If `_h` is not provided, it returns the current background color of the HTML element.

        #### rgb

        The `rgb` method is a method of the object returned by the `bg` function. It allows you to set or get the background color of an HTML element using RGB values.

        - Parameters:
        - `...args`: One or more arguments representing the RGB values.
        - Returns:
        - If `args` is provided, it sets the background color of the HTML element to the specified color and returns the element.
        - If `args` is not provided, it returns an array representing the RGB values of the current background color of the HTML element.

        #### rgb2hex

        The `rgb2hex` method is a method of the object returned by the `bg` function. It converts an RGB color to its corresponding hexadecimal color code.

        - Parameters:
        - `color`: A string representing the RGB color.
        - Returns:
        - A string representing the hexadecimal color code.

        #### hex2rgb

        The `hex2rgb` method is a method of the object returned by the `bg` function. It converts a hexadecimal color code to its corresponding RGB values.

        - Parameters:
        - `color`: A string representing the hexadecimal color code.
        - Returns:
        - A string representing the RGB values.

        #### image

        The `image` method is a method of the object returned by the `bg` function. It provides methods for manipulating the background image of an HTML element.

        - Returns:
        - An object with methods for manipulating the background image.

        #### url

        The `url` method is a method of the object returned by the `image` method. It sets or gets the URL of the background image.

        - Parameters:
        - `_url`: A string representing the URL of the background image.
        - Returns:
        - The object itself.

        #### repeat

        The `repeat` method is a method of the object returned by the `image` method. It sets or gets the repeat property of the background image.

        - Parameters:
        - `_repeat`: A string representing the repeat property.
        - Returns:
        - The object itself.

        #### origin

        The `origin` method is a method of the object returned by the `image` method. It sets or gets the origin property of the background image.

        - Parameters:
        - `_origin`: A string representing the origin property.
        - Returns:
        - The object itself.

        #### position

        The `position` method is a method of the object returned by the `image` method. It sets or gets the position property of the background image.

        - Parameters:
        - `_position`: A string representing the position property.
        - Returns:
        - The object itself.

        #### attachment

        The `attachment` method is a method of the object returned by the `image` method. It sets or gets the attachment property of the background image.

        - Parameters:
        - `_attachment`: A string representing the attachment property.
        - Returns:
        - The object itself.

        #### size

        The `size` method is a method of the object returned by the `image` method. It sets or gets the size property of the background image.

        - Parameters:
        - `_x`: A number or string representing the width of the background image.
        - `_y`: A number or string representing the height of the background image.
        - Returns:
        - The object itself.

        #### blendMode

        The `blendMode` method is a method of the object returned by the `image` method. It sets or gets the blend mode property of the background image.

        - Parameters:
        - `_blendMode`: blend mode
        - Returns:
        - The object itself

        #### clip

        The `clip` method is a method of the object returned by the `image` method. It sets or gets the clip property of the background image.

        - Parameters:
        - `clip`: clip
        - Returns:
        - The object itself

        #### set
        
        set the configured options or an opstions object passed as parameter

        - Parameters:
        - `_options`: gradient options object
        - Returns:
        - The element

        #### clear
        
        clear the bakground property for element style

        - Returns:
        - The element

        ### gradient
        
        Creates a new instance of a gradient setter object. The gradient setter object has several methods to set the gradient properties:

        #### linear

        Sets the gradient type to linear.

        - Returns:
        - The object itself

        #### radial

        Sets the gradient type to radial.

        - Returns:
        - The object itself

        #### conic

        Sets the gradient type to conic.

        - Returns:
        - The object itself

        #### repeat

        Sets the repeating property of the gradient to true.

        - Returns:
        - The object itself

        #### angle

        Sets the angle of the gradient.

        - Parameters
        - `_angle`: angle of gradient
        - Returns:
        - The object itself

        #### direction

        Sets the direction of the gradient.

        - Parameters
        - `_direction`: direction of linear gradient
        - Returns:
        - The object itself

        #### side

        Sets the side of the gradient.

        - Parameters
        - `_side`: side of radial gradient
        - Returns:
        - The object itself

        #### from

        Sets the from of the gradient.

        - Parameters
        - `_angle`: _angle for from of conic gradient
        - Returns:
        - The object itself

        #### at

        Sets the at of the gradient.

        - Parameters
        - `_per01`: first percentage
        - `_per02`: second percentage
        - Returns:
        - The object itself

        #### color

        Adds a color stop to the gradient.

        - Parameters
        - `_color`: color code
        - `_percentage_or_angle`: percentage or angle in function of the type of gradient
        - Returns:
        - The object itself

        #### set

        Set the gradient to the element style background property.

        - Parameters
        - `_options` [Optional]: And option object with the properties for the gradient
        - Returns:
        - The element

        #### clear

        Removes the babkground property from element style.

        - Returns:
        - The element

        The `set` method sets the gradient options and applies the gradient to the element's background. The gradient is applied using the `background` CSS property.

        The `clear` method removes the gradient from the element's background by removing the `background` CSS property.

        The `bgGradientOptions` property is set on the element to store the gradient options.


# CSSStyleDeclaration Prototype Methods

## leftPos(_left)

Sets the left position of an element.

### Parameters

- `_left`: The left position value. If a string and not a number, it is used as is. Otherwise, it is converted to pixels.

### Returns

- If `_left` is provided, returns `undefined`.
- If `_left` is not provided, returns the current left position value.

## rightPos(_right)

Sets the right position of an element.

### Parameters

- `_right`: The right position value. If a string and not a number, it is used as is. Otherwise, it is converted to pixels.

### Returns

- If `_right` is provided, returns `undefined`.
- If `_right` is not provided, returns the current right position value.

## topPos(_top)

Sets the top position of an element.

### Parameters

- `_top`: The top position value. If a string and not a number, it is used as is. Otherwise, it is converted to pixels.

### Returns

- If `_top` is provided, returns `undefined`.
- If `_top` is not provided, returns the current top position value.

## bottomPos(_bottom)

Sets the bottom position of an element.

### Parameters

- `_bottom`: The bottom position value. If a string and not a number, it is used as is. Otherwise, it is converted to pixels.

### Returns

- If `_bottom` is provided, returns `undefined`.
- If `_bottom` is not provided, returns the current bottom position value.



# String Prototype Methods

## capitalize()

Capitalizes the first letter of a string.

### Returns

- The capitalized string.

## asInt()

Converts a string to an integer.

### Returns

- The integer value of the string.

## asFloat()

Converts a string to a float.

### Returns

- The float value of the string.

## asBool()

Converts a string to a boolean.

### Returns

- `true` if the string is `"true"`.
- `false` otherwise.

## asHex()

Converts a string to a hexadecimal representation.

### Returns

- The hexadecimal representation of the string.

## fromHex()

Converts a hexadecimal string to a regular string.

### Returns

- The regular string.

## asBase64()

Converts a string to base64.

### Returns

- The base64 representation of the string.

## fromBase64()

Converts a base64 string to a regular string.

### Returns

- The regular string.

## hashCode()

Calculates the hash code of a string.

### Returns

- The hash code of the string.


# _xjs Class Documentation (xjs instance)

## Description
The `_xjs` class provides a set of utilities for working with HTML elements, animations, timers, math operations, and more. It is designed to simplify common tasks in web development by offering a range of methods and properties.

## Constants

### GradientDirection
Defines the direction of gradients.
- `TO_TOP`: 'to top'
- `TO_RIGHT`: 'to right'
- `TO_BOTTOM`: 'to bottom'
- `TO_LEFT`: 'to left'

### GradientSide
Defines the sides for gradients.
- `CLOSEST_SIDE`: "closest-side"
- `FARTHEST_SIDE`: "farthest-side"
- `CLOSEST_CORNER`: "closest-corner"
- `FARTHEST_SIDE`: "farthest-corner"

### BgImageOrigin
Defines the origin of background images.
- `BORDER_BOX`: 'border-box'
- `PADDING_BOX`: 'padding-box'
- `CONTENT_BOX`: 'content-box'

## Methods

### Query

#### getElm(id, queryType, index)
Retrieves an element from the document based on the provided `id`, `queryType`, and `index`.
- **Parameters:**
  - `id` (string): The ID of the element.
  - `queryType` (string): The type of query (optional).
  - `index` (number): The index of the element (optional).
- **Returns:** The queried element(s).

### Function

#### registerTimer(name, object, callback, interval, ...args)
Registers a timer that repeatedly calls a callback function.
- **Parameters:**
  - `name` (string): The name of the timer.
  - `object` (Object): The context for the callback.
  - `callback` (function): The function to be called.
  - `interval` (number): The interval in milliseconds.
  - `...args`: Additional arguments to pass to the callback.

#### unregisterTimer(name)
Unregisters a previously registered timer.
- **Parameters:**
  - `name` (string): The name of the timer to unregister.

#### timeOut(callback, time, object, ...args)
Sets a timeout to call a callback function after a specified time.
- **Parameters:**
  - `callback` (function): The function to be called.
  - `time` (number): The time in milliseconds.
  - `object` (Object): The context for the callback (optional).
  - `...args`: Additional arguments to pass to the callback.

#### lazy(creator)
Creates a lazily evaluated function.
- **Parameters:**
  - `creator` (function): The function to be lazily evaluated.
- **Returns:** A lazily evaluated function.

### Animation

#### animate(elements, styles, time, callback)
Animates a set of elements with specified styles over a given time period.
- **Parameters:**
  - `elements` (Array): Array of elements to animate.
  - `styles` (Array): Array of style objects for each element.
  - `time` (number): Duration of the animation in milliseconds.
  - `callback` (function): Function to call upon completion (optional).
- **Returns:** A promise that resolves when the animation is complete.

### Property

#### getProperty(id, property)
Gets the property of an element by its ID.
- **Parameters:**
  - `id` (string): The ID of the element.
  - `property` (string): The property to retrieve.
- **Returns:** The value of the property.

#### setProperty(id, property, value)
Sets the property of an element by its ID.
- **Parameters:**
  - `id` (string): The ID of the element.
  - `property` (string): The property to set.
  - `value` (any): The value to set.
- **Returns:** The element with the updated property.

### Style

#### getStyleProperty(id, property, format)
Gets the style property of an element by its ID.
- **Parameters:**
  - `id` (string): The ID of the element.
  - `property` (string): The style property to retrieve.
  - `format` (string): The format of the returned value (optional).
- **Returns:** The value of the style property.

#### setStyleProperty(id, property, value)
Sets the style property of an element by its ID.
- **Parameters:**
  - `id` (string): The ID of the element.
  - `property` (string): The style property to set.
  - `value` (any): The value to set.
- **Returns:** The element with the updated style property.

### String

#### toBaseAscii()
Normalizes a string to its base ASCII representation.
- **Returns:** The normalized string.

#### loremipsum(length)
Generates a Lorem Ipsum text of specified length.
- **Parameters:**
  - `length` (number): The length of the Lorem Ipsum text.
- **Returns:** The generated Lorem Ipsum text.

### Math

#### array2D(r, c)
Creates a 2D array.
- **Parameters:**
  - `r` (number): Number of rows.
  - `c` (number): Number of columns.
- **Returns:** A 2D array filled with zeros.

#### array3D(r, c, d)
Creates a 3D array.
- **Parameters:**
  - `r` (number): Number of rows.
  - `c` (number): Number of columns.
  - `d` (number): Depth of the array.
- **Returns:** A 3D array filled with zeros.

#### array4D(r, c, d, e)
Creates a 4D array.
- **Parameters:**
  - `r` (number): Number of rows.
  - `c` (number): Number of columns.
  - `d` (number): Depth of the array.
  - `e` (number): Fourth dimension of the array.
- **Returns:** A 4D array filled with zeros.

#### map(value, start1, stop1, start2, stop2)
Maps a value from one range to another.
- **Parameters:**
  - `value` (number): The value to map.
  - `start1` (number): Start of the input range.
  - `stop1` (number): End of the input range.
  - `start2` (number): Start of the output range.
  - `stop2` (number): End of the output range.
- **Returns:** The mapped value.

#### clamp(value, min, max)
Clamps a value between a minimum and maximum value.
- **Parameters:**
  - `value` (number): The value to clamp.
  - `min` (number): The minimum value.
  - `max` (number): The maximum value.
- **Returns:** The clamped value.

#### lerp(a, b, n)
Linearly interpolates between two values.
- **Parameters:**
  - `a` (number): The start value.
  - `b` (number): The end value.
  - `n` (number): The interpolation factor.
- **Returns:** The interpolated value.

#### invlerp(x, y, a)
Inverse linear interpolation.
- **Parameters:**
  - `x` (number): Start of the range.
  - `y` (number): End of the range.
  - `a` (number): The value to interpolate.
- **Returns:** The interpolated value.

#### easeLinear(t, b, c, d)
Linear easing function.
- **Parameters:**
  - `t` (number): Current time.
  - `b` (number): Start value.
  - `c` (number): Change in value.
  - `d` (number): Duration.
- **Returns:** The eased value.

### Color

#### hexaToRgbaArray(hexa)
Converts a hex color to an RGBA array.
- **Parameters:**
  - `hexa` (string): The hex color.
- **Returns:** An array with RGBA values.

### Date

#### formatDate(format = "yyyy/MM/dd hh:mm:ss", date = new Date())
Formats a date according to the specified format.
- **Parameters:**
  - `format` (string): The date format.
  - `date` (Date): The date object (optional).
- **Returns:** The formatted date string.

### Time

#### secondsToHHMMSS(sec_num, hours = false)
Converts seconds to HH:MM:SS format.
- **Parameters:**
  - `sec_num` (number): The number of seconds.
  - `hours` (boolean): Whether to include hours (optional).
- **Returns:** The formatted time string.

### URL

#### urljoin(...args)
Joins URL segments into a single URL.
- **Parameters:**
  - `...args`: URL segments.
- **Returns:** The joined URL string.

### HTMLElements

#### htmlElements
Provides a map of common HTML elements.
- **Returns:** An object with HTML elements.

#### registerXJSElement(name, tag)
Registers a custom XJS element.
- **Parameters:**
  - `name` (string): The name of the element (must start with 'xjs').
  - `tag` (string): The tag name of the element.
- **Throws:** Error if the name does not start with 'xjs' or already exists.

#### with(elm)

Fetches an existing element or returns the element if it is already provided.

- **Parameters:**
  - `elm` (string|HTMLElement): The ID of the element to fetch or the element itself.
- **Returns:** (HTMLElement) The fetched or provided element.

#### withnew(htmlelm, id, name, value)

Creates a new HTML element or XJS element with specified attributes.

- **Parameters:**
  - `htmlelm` (string): The type of element to create.
  - `id` (string, optional): The ID of the new element.
  - `name` (string, optional): The name attribute of the new element.
  - `value` (string, optional): The value attribute of the new element.
- **Returns:** (HTMLElement|null) The created element or null if the type is not valid.

#### registerComponent(name, component)

Registers a new component.

- **Parameters:**
  - `name` (string): The name of the component.
  - `component` (HTMLElement): The component to register.
- **Returns:** void

#### hasComponent(name)

Checks if a component is registered.

- **Parameters:**
  - `name` (string): The name of the component.
- **Returns:** (boolean) True if the component is registered, false otherwise.

#### getComponent(name)

Retrieves a registered component.

- **Parameters:**
  - `name` (string): The name of the component.
- **Returns:** (HTMLElement) The registered component.

## Properties

#### htmlElements

Provides a collection of commonly used HTML elements.

- **Returns:** (object) An object containing string representations of HTML elements.

#### xjselements

Provides a collection of registered XJS elements.

- **Returns:** (object) An object mapping element names to their string identifiers.

## Private Methods and Properties

#### #htmlelements

A private collection of lazily instantiated HTML elements.

#### #xjselementsMap

A private mapping of XJS element names to their string identifiers.

#### #xjselements

A private collection of lazily instantiated XJS elements.

#### #components

A private collection of registered components.


**Usage Examples:**

https://github.com/ryddle/xjs/blob/master/index.html