const modeButton = document.querySelector('#toggle');
let redirectURL = 'blog.html';
const mainEl = document.querySelector('main');



const redirectPage = (url) => {
  redirectURL = url;
  location.assign(url);
};

const applyMode = function (mode) {
  let icon, circleColor;
  if (mode === 'light') {
    icon = '☀️';
    circleColor = '#black';
  } else {
    icon = '🌒';
    circleColor = '#white';
  }
  document.body.classList = mode;
  document.documentElement.style.setProperty('--circle-color', circleColor);
};

const handleModeToggle = function () {
  const mode = readMode();
  let nextMode;
  if (mode === 'light') {
    nextMode = 'dark';
  } else {
    nextMode = 'light';
  }
  applyMode(nextMode);
  saveMode(nextMode);
};

const readLocalStorage = () => {
  const blogPost = localStorage.getItem('blogPost');
  console.log('Reading from local storage:', blogPost);
  return blogPost ? JSON.parse(blogPost) : [];
};

const readMode = function () {
  const mode = localStorage.getItem('mode') || 'dark';
  console.log('Current mode:', mode);
  return mode;
};

const saveMode = function (mode) {
  console.log('Saving mode to local storage:', mode);
  localStorage.setItem('mode', mode);
};

const storeLocalStorage = function (info) {
  const blogs = readLocalStorage();
  console.log('Current blogs from local storage:', blogs);
  blogs.push(info);
  console.log('Updated blogs with new info:', blogs);
  localStorage.setItem('blogs', JSON.stringify(blogs));
  console.log('Blogs saved to local storage:', JSON.stringify(blogs));
};

const buildEl = function (type, text, parent) {
    const tag = document.createElement(type);
    tag.textContent = text;
    parent.appendChild(tag);
    return tag;
};

const noPost = function () {
    buildEl('h2', 'No Blog posts yet...', mainEl);
    const a = buildEl('a', 'Write Words here!', mainEl);
    a.href = './index.html';
};

const renderBlogList = function () {
    const blogs = readLocalStorage();
    console.log('Blogs read from local storage:', blogs);

    if (!blogs.length) {
        noPost();
        return;
    }

    for (const blog of blogs) {
        const article = buildEl('article', null, mainEl);
        buildEl('h2', blog.title, article);
        buildEl('blockquote', blog.content, article);
        buildEl('p', `Posted by: ${blog.username}`, article);
        article.classList.add('card');
    }
};

applyMode(readMode());
modeButton.addEventListener('click', handleModeToggle);
renderBlogList();