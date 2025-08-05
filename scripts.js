document.addEventListener('DOMContentLoaded', function () {
  // Apply saved theme immediately
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Load header
  fetch('header.html')
    .then(response => response.text())
    .then(data => {
      const header = document.getElementById('header');
      if (header) {
        header.innerHTML = data;

        // Now that the header is loaded, set up the toggle button
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) {
          toggleBtn.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
          });
        }
      }
    });

  // Load footer
  fetch('footer.html')
    .then(response => response.text())
    .then(data => {
      const footer = document.getElementById('footer');
      if (footer) footer.innerHTML = data;
    });

  // Load blog posts if applicable
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
});
      
