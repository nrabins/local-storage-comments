
/**
 * A basic comment, has a comment string.
 */
interface Comment {
  // name: string,
  comment: string
}

/**
 * This library uses local storage to allow for the saving and recovery of comments
 */
class CommentSection {

  private comments = [] as Comment[];

  private noCommentsEl: HTMLDivElement;
  private oldCommentsEl: HTMLDivElement;
  private newCommentsEl: HTMLTextAreaElement;
  private saveCommentBtn: HTMLButtonElement;

  constructor(private commentSectionEl: HTMLDivElement, private storageKey: string = 'COMMENT_STORAGE') {

    this.commentSectionEl.classList.add('comments-section');

    // Create the elements that will be added to the page on init
    this.noCommentsEl = document.createElement('div');
    this.noCommentsEl.classList.add('comments-no-comments');
    this.noCommentsEl.innerText = 'No comments yet';
    this.noCommentsEl.setAttribute('hidden', 'true');

    this.oldCommentsEl = document.createElement('div');
    this.oldCommentsEl.classList.add('comments-old-comments')

    this.newCommentsEl = document.createElement('textarea');
    this.newCommentsEl.classList.add('comments-new-comment');
    this.newCommentsEl.setAttribute('placeholder', 'Leave a comment!');

    this.saveCommentBtn = document.createElement('button');
    this.saveCommentBtn.classList.add('comments-save');
    this.saveCommentBtn.innerText = 'Save';
    this.saveCommentBtn.addEventListener('click', () => this.onSave());

    // Add the elements to the document
    this.commentSectionEl.appendChild(this.noCommentsEl);
    this.commentSectionEl.appendChild(this.oldCommentsEl);
    this.commentSectionEl.appendChild(this.newCommentsEl);
    this.commentSectionEl.appendChild(this.saveCommentBtn);

    this.loadAndRenderComments();
  }

  private loadAndRenderComments(): void {
    this.loadComments();

    if (this.comments.length > 0) {
      this.comments.forEach(comment => {
        this.addCommentEl(comment);
      });
      this.noCommentsEl.setAttribute('hidden', 'true');
    } else {
      this.noCommentsEl.removeAttribute('hidden');
    }
  }

  private loadComments(): void {
    this.comments = [] as Comment[];

    let commentStr = window.localStorage.getItem(this.storageKey);
    if (commentStr) {
      this.comments = JSON.parse(commentStr);
    }
  }

  private addComment(comment: Comment): void {
    this.comments.push(comment);
    this.addCommentEl(comment);
  }

  private onSave(): void {
    const commentText = this.newCommentsEl.value;
    if (commentText.trim().length > 0) {
      const comment = { comment: commentText } as Comment;
      this.addComment(comment);
      this.persistComments();
      this.newCommentsEl.value = '';
    }
  }

  private addCommentEl(comment: Comment): void {
    const commentEl = CommentSection.makeCommentEl(comment);
    this.oldCommentsEl.appendChild(commentEl);
  }

  private static makeCommentEl(comment: Comment): HTMLDivElement {
    const commentEl = document.createElement('div');
    commentEl.innerText = comment.comment;
    return commentEl;
  }

  private persistComments() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
  }

}