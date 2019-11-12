var CommentSection = (function () {
    function CommentSection(commentSectionEl, storageKey) {
        var _this = this;
        if (storageKey === void 0) { storageKey = 'COMMENT_STORAGE'; }
        this.commentSectionEl = commentSectionEl;
        this.storageKey = storageKey;
        this.comments = [];
        this.commentSectionEl.classList.add('comments-section');
        this.noCommentsEl = document.createElement('div');
        this.noCommentsEl.classList.add('comments-no-comments');
        this.noCommentsEl.innerText = 'No comments yet';
        this.noCommentsEl.setAttribute('hidden', 'true');
        this.oldCommentsEl = document.createElement('div');
        this.oldCommentsEl.classList.add('comments-old-comments');
        this.newCommentsEl = document.createElement('textarea');
        this.newCommentsEl.classList.add('comments-new-comment');
        this.newCommentsEl.setAttribute('placeholder', 'Leave a comment!');
        this.saveCommentBtn = document.createElement('button');
        this.saveCommentBtn.classList.add('comments-save');
        this.saveCommentBtn.innerText = 'Save';
        this.saveCommentBtn.addEventListener('click', function () { return _this.onSave(); });
        this.commentSectionEl.appendChild(this.noCommentsEl);
        this.commentSectionEl.appendChild(this.oldCommentsEl);
        this.commentSectionEl.appendChild(this.newCommentsEl);
        this.commentSectionEl.appendChild(this.saveCommentBtn);
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
    CommentSection.prototype.onSave = function () {
        var commentText = this.newCommentsEl.value;
        if (commentText.trim().length > 0) {
            var comment = { comment: commentText };
            this.addComment(comment);
            this.persistComments();
            this.newCommentsEl.value = '';
        }
    };
    CommentSection.prototype.addCommentEl = function (comment) {
        var commentEl = CommentSection.makeCommentEl(comment);
        this.oldCommentsEl.appendChild(commentEl);
    };
    CommentSection.makeCommentEl = function (comment) {
        var commentEl = document.createElement('div');
        commentEl.innerText = comment.comment;
        return commentEl;
    };
    CommentSection.prototype.persistComments = function () {
        window.localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
    };
    return CommentSection;
}());
//# sourceMappingURL=comments.js.map