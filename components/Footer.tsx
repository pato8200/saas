const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-400">WorkoutAI</h3>
            <p className="text-gray-300">
              Personalized training platform with artificial intelligence for effective and safe results.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="/anamnese" className="text-gray-300 hover:text-yellow-400 transition-colors">Health Assessment</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-yellow-400 transition-colors">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">Cancellation Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">support@workoutai.com</li>
              <li className="text-gray-300">+55 (11) 99999-9999</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TreinoIA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;