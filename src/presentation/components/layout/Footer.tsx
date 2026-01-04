export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🇨🇴 Colombia Explorer</h3>
            <p className="text-gray-400">
              Explora la belleza y diversidad de Colombia a través de sus departamentos,
              regiones y atracciones turísticas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/" className="hover:text-colombia-yellow transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/departments" className="hover:text-colombia-yellow transition-colors">
                  Departamentos
                </a>
              </li>
              <li>
                <a href="/regions" className="hover:text-colombia-yellow transition-colors">
                  Regiones
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Datos Proporcionados por</h4>
            <a
              href="https://api-colombia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-colombia-yellow hover:underline"
            >
              API-Colombia
            </a>
            <p className="text-gray-400 mt-2 text-sm">
              API pública y gratuita sobre Colombia
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            Desarrollado con ❤️ usando React, TypeScript y Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
