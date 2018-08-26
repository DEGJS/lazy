# lazy
Lazy is a generic asset lazy loader. Assets will load right before they scroll into the viewport. By default, Lazy will lazy load images, but it can also be configured to fire a generic callback whenever any element enters the viewport, making it useful for loading or animating practically any element or asset type. 

## Install
Lazy is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) and a module loader as part of your Javascript workflow.

If you're already using the [JSPM package manager](http://jspm.io) for your project, you can install moduleLoader with the following command:

```
$ jspm install github:DEGJS/lazy
```

## Usage
Sample Javascript:
```js
import lazy from "DEGJS/lazy";

/* Instantiate Lazy, with options */
const lazyOptions = {
    animationClass: 'fade-in',
    rootMargin: '200px 0px'
};

lazy(lazyOptions);
```

Sample Markup:
```html
<img data-lazy data-src="https://placehold.it/1024x768" alt="Lazy loaded image using img element">

<picture data-lazy>
    <source data-srcset="https://placehold.it/1024x768" media="(min-width: 1000px)">
    <img data-src="https://placehold.it/512x384" alt="Lazy loaded image using picture element">
</picture>
```

## Options
#### options.elSelector
Type: `String`   
The name of the selector for elements that should be lazy loaded.  
Default: `data-lazy`

#### options.animationClass
Type: `String`   
An optional CSS class that will be applied to elements as they're lazy loaded in.  
Default: `null`

#### options.root
Type: `Element`   
The element that is used as the viewport for checking visiblity of the target, from the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options).  
Default: `null`

#### options.rootMargin
Type: `String`  
The margin around the root, from the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options).  
Default: `200px 0px`

#### options.threshold
Type: `Number`  
Either a single number or an array of numbers which indicate at what percentage of the target's visibility the observer's callback should be executed. From the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options).  
Default: `0.1`

#### options.onIntersectionCallback
Type: `Function`  
Returns: `Element`  
An optional callback that will override the default image-loading behavior, and simply return the observed element that has entered the viewport.  
Default: `null`

## Methods

### .observe(els)
Parameters: `els`  
An element or array of elements to add begin observing.

### .load(els)
Parameters: `els`  
An element or array of elements to load immediately.

## Browser Support
Lazy depends on the following browser APIs:
+ IntersectionObserver: [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) | [Polyfill](https://github.com/w3c/IntersectionObserver) (Note: in legacy browsers that don't support IntersectionObserver, elements tagged for lazy loading will still be lazy loaded, but it will occur immediately on page load, rather than when they enter the viewport))

To support legacy browsers, you'll need to include polyfills for the above APIs. 
