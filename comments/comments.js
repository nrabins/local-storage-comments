var CommentSection = (function () {
    function CommentSection(commentSectionEl, storageKey) {
        var _this = this;
        if (storageKey === void 0) { storageKey = 'COMMENT_STORAGE'; }
        this.commentSectionEl = commentSectionEl;
        this.storageKey = storageKey;
        this.comments = [];
        this.commentSectionEl.classList.add('comments-section');
        var template = "\n      <form id='comments-form' class='comments-form'>\n        <div id='comments-form-name-container'>\n          <input type='text' id='comments-name' class='comments-name' maxlength='32' placeholder='Your name'/>\n        </div>\n        <textarea id='comments-new-comment' maxlength='500' placeholder='Leave a comment!'></textarea>\n        <button type='submit'>Save Comment</button>\n      </form>\n      <div id='comments-no-comments' hidden>No comments yet</div>\n      <div id='comments-old-comments'></div>\n    ";
        this.commentSectionEl.innerHTML = template;
        this.form = document.getElementById('comments-form');
        this.noCommentsEl = document.getElementById('comments-no-comments');
        this.oldCommentsEl = document.getElementById('comments-old-comments');
        this.nameEl = document.getElementById('comments-name');
        this.newCommentEl = document.getElementById('comments-new-comment');
        this.form.addEventListener('submit', function (e) { return _this.onSave(e); });
        this.loadAndRenderComments();
    }
    CommentSection.prototype.loadAndRenderComments = function () {
        var _this = this;
        this.loadComments();
        if (this.comments.length > 0) {
            this.comments.forEach(function (comment) {
                _this.addCommentEl(comment);
            });
            this.noCommentsEl.setAttribute('hidden', 'true');
        }
        else {
            this.noCommentsEl.removeAttribute('hidden');
        }
    };
    CommentSection.prototype.addCommentEl = function (comment) {
        var commentEl = CommentSection.makeCommentEl(comment);
        this.oldCommentsEl.appendChild(commentEl);
        setTimeout(function () { return commentEl.classList.remove('hidden'); }, 0);
    };
    CommentSection.prototype.loadComments = function () {
        this.comments = [];
        var commentStr = window.localStorage.getItem(this.storageKey);
        if (commentStr) {
            this.comments = JSON.parse(commentStr);
        }
    };
    CommentSection.prototype.addComment = function (comment) {
        this.comments.push(comment);
        this.addCommentEl(comment);
    };
    CommentSection.prototype.onSave = function (ev) {
        ev.preventDefault();
        var commentText = this.newCommentEl.value;
        var nameText = this.nameEl.value;
        if (this.canSaveComment(nameText, commentText)) {
            var comment = { name: nameText, comment: commentText, timeStamp: new Date().toLocaleDateString() };
            this.addComment(comment);
            this.persistComments();
            this.nameEl.value = '';
            this.newCommentEl.value = '';
        }
    };
    CommentSection.prototype.canSaveComment = function (nameText, commentText) {
        return nameText.trim().length > 0 && commentText.trim().length > 0;
    };
    CommentSection.prototype.persistComments = function () {
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
    };
    CommentSection.makeCommentEl = function (comment) {
        var commentEl = document.createElement('div');
        commentEl.classList.add('comments-comment', 'hidden');
        commentEl.innerHTML =
            "\n      <div class='comments-comment-metadata'>\n        <div class='comments-comment-name'>" + comment.name + "</div>\n        <div class='comments-comment-date'>" + comment.timeStamp + "</div>\n      </div>\n      <span class='comments-comment-text'>" + comment.comment + "</span>\n    ";
        return commentEl;
    };
    return CommentSection;
}());
//# sourceMappingURL=comments.js.map