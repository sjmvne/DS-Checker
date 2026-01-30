import React from 'react';

const ProductCard = ({ title, tag, desc, sub, colorClass, bgClass, textClass, borderClass }) => (
    <div className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${borderClass} hover:shadow-md transition-all`}>
        <div className="flex justify-between items-start mb-2">
            <h4 className="font-bold text-gray-800 text-sm md:text-base">{title}</h4>
            <span className={`${bgClass} ${textClass} text-[10px] md:text-xs px-2 py-1 rounded font-medium ml-2 shrink-0`}>{tag}</span>
        </div>
        <p className="text-sm text-gray-500 leading-snug">{desc}</p>
        <div className="mt-3 text-xs text-gray-400 font-medium">{sub}</div>
    </div>
);

const FaqItem = ({ q, a }) => (
    <div className="bg-white/50 p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
        <h5 className="font-semibold text-blue-700 mb-2 flex gap-2">
            <span>❓</span> {q}
        </h5>
        <p className="text-sm text-gray-600 pl-7">{a}</p>
    </div>
);

const Protocol = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Protocollo e Implementazione</h2>
                <p className="text-gray-600 leading-relaxed">
                    Come trasformare la teoria in pratica. Qui troverai raccomandazioni sui prodotti (basate sul database "sicuro") e risposte alle domande frequenti.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Protocol Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Safe Products Grid */}
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span>✅</span> Esempi di Prodotti Sicuri
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ProductCard 
                                title="MCT Oil (C8/C10 Puro)" 
                                tag="Olio" 
                                desc="L'unico olio veramente sicuro. Usare come struccante o idratante."
                                sub="Brand: Bulletproof, Kiss My Keto (Verificare solo C8/C10)"
                                borderClass="border-emerald-400"
                                bgClass="bg-emerald-100"
                                textClass="text-emerald-800"
                            />
                            <ProductCard 
                                title="CeraVe Detergente Idratante" 
                                tag="Detergente" 
                                desc="Senza solfati aggressivi, contiene ceramidi per la barriera."
                                sub="Verificare INCI locale (formula EU vs US varia)."
                                borderClass="border-sky-400"
                                bgClass="bg-sky-100"
                                textClass="text-sky-800"
                            />
                            <ProductCard 
                                title="Squalano (Vegetale)" 
                                tag="Idratante" 
                                desc="Idrocarburo saturo stabile. Non è un trigliceride, quindi sicuro."
                                sub="Brand: The Ordinary, Biossance"
                                borderClass="border-purple-400"
                                bgClass="bg-purple-100"
                                textClass="text-purple-800"
                            />
                            <ProductCard 
                                title="Nizoral (Ketoconazolo 2%)" 
                                tag="Trattamento" 
                                desc="Gold standard antifungino. Usare 2-3 volte a settimana in fase acuta."
                                sub="Farmaco da banco"
                                borderClass="border-amber-400"
                                bgClass="bg-amber-100"
                                textClass="text-amber-800"
                            />
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section>
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Domande Frequenti</h3>
                        <div className="space-y-4">
                            <FaqItem 
                                q="Esiste una cura definitiva per la Dermatite Seborroica?"
                                a="NO. La DS è cronica ma altamente gestibile. Molti raggiungono la remissione per mesi o anni con il protocollo corretto, ma le ricadute sono possibili se si usano prodotti trigger."
                            />
                            <FaqItem 
                                q="Posso usare il mio shampoo normale se uso anche quello antifungino?"
                                a="NO. Usare uno shampoo normale con oli (trigger) è come gettare benzina sul fuoco mentre cerchi di spegnerlo con l'antifungino. Devi eliminare i trigger."
                            />
                            <FaqItem 
                                q="Tutti gli oli sono dannosi?"
                                a="NO. Solo gli acidi grassi C12-C24. L'olio MCT (C8/C10), l'olio minerale e lo squalano sono sicuri."
                            />
                             <FaqItem 
                                q="Se sono in remissione, posso usare un prodotto 'non sicuro' una tantum?"
                                a="NON RACCOMANDATO. Una singola esposizione a prodotti ad alto rischio (es. maschera all'olio di cocco) può riattivare una riacutizzazione che dura settimane."
                            />
                        </div>
                    </section>
                </div>

                {/* Myths Sidebar */}
                <aside className="bg-slate-800/95 text-slate-50 p-6 rounded-2xl h-fit shadow-xl border border-slate-700">
                    <h3 className="text-lg font-bold text-white mb-6 border-b border-slate-600 pb-2 flex items-center gap-2">
                        <span>🚫</span> Miti da Sfatare
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 text-xl font-bold mt-[-2px]">✖</span>
                            <div className="text-sm">
                                <strong className="block text-red-200 mb-1">"È solo pelle secca"</strong>
                                No, è un'infiammazione causata da funghi. Aggiungere oli tradizionali (Oliva, Cocco) peggiora la situazione quasi istantaneamente.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 text-xl font-bold mt-[-2px]">✖</span>
                            <div className="text-sm">
                                <strong className="block text-red-200 mb-1">"L'olio di cocco è antimicotico"</strong>
                                In provetta sì (acido laurico), ma sulla pelle l'acido laurico (C12) è il principale <em>nutrimento</em> esplosivo per la Malassezia.
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-red-400 text-xl font-bold mt-[-2px]">✖</span>
                            <div className="text-sm">
                                <strong className="block text-red-200 mb-1">"I prodotti bio sono sicuri"</strong>
                                La Malassezia è naturale! Ama la natura. Molti estratti vegetali e oli organici sono il suo cibo preferito.
                            </div>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default Protocol;
