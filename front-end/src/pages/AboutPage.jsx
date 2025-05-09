// AboutPage.jsx
import '../css_files/about.css'

const AboutPage = () => {
  return (
    <div className="about-section">
      <h2 className="section-title">About Clean Routine</h2>
      <p className="section-text">
        Keeping your home clean shouldn't feel like a full-time job. Most of us clean reactively—waiting for messes to pile up before tackling them. It’s exhausting, time-consuming, and never truly done.
      </p>
      <p className="section-text">
        What if cleaning could be simple, automatic, and stress-free?
      </p>

      <h3 className="subheading">Here's how Clean Routine helps:</h3>
      <ul className="feature-list">
        <li>✔ Easy daily systems to keep things tidy</li>
        <li>✔ Routines that match your lifestyle</li>
        <li>✔ Less stress and a cozy, clean home</li>
        <li>✔ Add, edit, or remove rooms and their tasks</li>
        <li>✔ View your personalized schedule by day of the week</li>
        <li>✔ Search local weather by city to help plan your schedule</li>
      </ul>
    </div>
  );
};

export default AboutPage;