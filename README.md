# local-storage-comments
This library allows you to create a comments section that persists comments to [window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).

## Using local-storage-comments

### Step 1: Create the HTML structure
All you need to create in your HTML is a `div` with a unique id.

```html
<div id="my-comments-section"></div>
```

The script that runs injects an html structure and listeners 

### Step 2: Add the stylesheet
You'll need to use the comments.css stylesheet in order to make things look right. Add the stylesheet in the `<head>` element, before your own website's stylesheets. This code snippet shows how to load the comments.css stylesheet that's hosted on another server so you don't have to download it:

```html
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/nrabins/local-storage-comments@master/comments/comments.css">
```

### Step 3: Add the javascript code
Use the `<script>` element to load the javascript library (the `comments.js` file). Then use another `<script>` element to initialize the comments section. The following code snippet shows how to load the library from another server and initialize it.

It's best to add javascript code at the end of your `<body>` element (just before the `</body>` closing tag).

```html
<script src="https://cdn.jsdelivr.net/gh/nrabins/local-storage-comments@master/comments/comments.js"></script>
<script>new CommentSection(document.getElementById('my-comments-section'));</script>
```

The text in parentheses on the 2nd line is a ID selector for the comments container element. If your comments section container has the class name `"my-comments-section"`, you would use `'.my-comments-section'` for the part in parentheses.

Optionally, you can provide a second parameter to specify the localStorage key associated with this comment section. This is useful if you wish to have comment sections on multiple pages.

```html
<script>new CommentSection(document.getElementById('my-comments-section', 'CONTACT_US_PAGE_COMMENTS'));</script>
```

*Important:* Be sure to always include the closing `</script>` tag! It's always required, even when there's nothing inside the element.

### Step 4: Add custom styling (optional)
The script from step 3 will inject html into your div. This html will look something like this:

```html
<div id="commentSection" class="comments-section">

  <!-- Form for adding a new comment -->
  <form id="comments-form" class="comments-form">
    <div id="comments-form-name-container">
      <input type="text" id="comments-name" class="comments-name" maxlength="32" placeholder="Your name">
    </div>
    <textarea id="comments-new-comment" maxlength="500" placeholder="Leave a comment!"></textarea>
    <button type="submit">Save Comment</button>
  </form>

  <!-- Div that shows when there are no comments -->
  <div id="comments-no-comments" hidden="true">No comments yet</div>
  
  <!-- Div that holds all the existing comments -->
  <div id="comments-old-comments">

    <!-- Comment -->
    <div class="comments-comment">
      <div class="comments-comment-metadata">
        <div class="comments-comment-name">Nate</div>
        <div class="comments-comment-date">11/13/2019</div>
      </div>
      <span class="comments-comment-text">This is an example comment!</span>
    </div>
  </div>
</div>
```

If you want to add custom styling, you'll need to add style rules in a .css file targeting the generated html.

## A note about local storage
Local storage can be viewed by going into the dev tools (F12) and selecting the Application tab. From this tab, you can view the contents of the one or more comment sections you've created and clear them out/modify them as desired.

For more information about window.localStorage, check out [this documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
