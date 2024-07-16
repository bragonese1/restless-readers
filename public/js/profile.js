const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#book-name').value.trim();
    const review = document.querySelector('#book-review').value.trim();
    const description = document.querySelector('#book-desc').value.trim();
  
    if (name && description && review) {
      const response = await fetch(`/api/book`, {
        method: 'POST',
        body: JSON.stringify({ name, description, review }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create project');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/book/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete project');
      }
    }
  };
  
  document
    .querySelector('.new-project-form')
    .addEventListener('submit', newFormHandler);
  
  document
    .querySelector('.project-list')
    .addEventListener('click', delButtonHandler);
  
