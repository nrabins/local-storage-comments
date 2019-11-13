
/**
 * A basic comment, has a comment string.
 */
interface Comment {
  name: string,
  timeStamp: string,
  comment: string
}

/**
 * This library uses local storage to allow for the saving and recovery of comments
 */
class CommentSection {

  private comments = [] as Comment[];

  private form: HTMLFormElement;
  private noCommentsEl: HTMLDivElement;
  private oldCommentsEl: HTMLDivElement;
  private nameEl: HTMLInputElement;
  private newCommentEl: HTMLTextAreaElement;

  constructor(private commentSectionEl: HTMLDivElement, private storageKey: string = 'COMMENT_STORAGE') {

    this.commentSectionEl.classList.add('comments-section');

    const template = `
      <form id='comments-form' class='comments-form'>
        <div id='comments-form-name-container'>
          <input type='text' id='comments-name' class='comments-name' maxlength='32' placeholder='Your name'/>
        </div>
        <textarea id='comments-new-comment' maxlength='500' placeholder='Leave a comment!'></textarea>
        <button type='submit'>Save Comment</button>
      </form>
      <div id='comments-no-comments' hidden>No comments yet</div>
      <div id='comments-old-comments'></div>
    `

    this.commentSectionEl.innerHTML = template;

    this.form = document.getElementById('comments-form') as HTMLFormElement;
    this.noCommentsEl = document.getElementById('comments-no-comments') as HTMLDivElement;
    this.oldCommentsEl = document.getElementById('comments-old-comments') as HTMLDivElement;
    this.nameEl = document.getElementById('comments-name') as HTMLInputElement;
    this.newCommentEl = document.getElementById('comments-new-comment') as HTMLTextAreaElement;

    this.form.addEventListener('submit', e => this.onSave(e));

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

  private addCommentEl(comment: Comment): void {
    const commentEl = CommentSection.makeCommentEl(comment);
    this.oldCommentsEl.appendChild(commentEl);
    setTimeout(()=>commentEl.classList.remove('hidden'), 0);
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

  private onSave(ev: Event): void {
    ev.preventDefault();
    const commentText = this.newCommentEl.value;
    const nameText = this.nameEl.value;

    if (this.canSaveComment(nameText, commentText)) {
      const comment = { name: nameText, comment: commentText, timeStamp: new Date().toLocaleDateString() } as Comment;
      this.addComment(comment);
      this.persistComments();
      this.nameEl.value = '';
      this.newCommentEl.value = '';
    }
  }

  private canSaveComment(nameText: string, commentText: string): boolean {
    return nameText.trim().length > 0 && commentText.trim().length > 0;
  }

  private persistComments() {
    window.localStorage.setItem(this.storageKey, JSON.stringify(this.comments));
  }

  private static makeCommentEl(comment: Comment): HTMLDivElement {
    const commentEl = document.createElement('div');
    commentEl.classList.add('comments-comment', 'hidden');

    commentEl.innerHTML =
    `
      <div class='comments-comment-metadata'>
        <div class='comments-comment-name'>${comment.name}</div>
        <div class='comments-comment-date'>${comment.timeStamp}</div>
      </div>
      <span class='comments-comment-text'>${comment.comment}</span>
    `
    return commentEl;
  }


}