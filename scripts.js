document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle
  const toggleBtn = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  } else {
    console.error('Toggle button not found.');
  }

  // Load blog posts
  const blogList = document.getElementById('blog-list');
  if (blogList) {
    fetch('data/posts.json')
      .then(response => response.json())
      .then(posts => {
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.className = 'blog-post';
          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p><em>${post.date}</em></p>
            <p>${post.content}</p>
          `;
          blogList.appendChild(postElement);
        });
      })
      .catch(error => console.error('Error loading blog posts:', error));
  }

  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header').innerHTML = data;
    });

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer').innerHTML = data;
    });
});
