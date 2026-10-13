
import Link from "next/link";
import { FiInfo, FiShield, FiArrowUpRight, FiMail } from "react-icons/fi";
import type { ReactNode } from "react";
import Container from "@/ui/Container";

type PolicySectionProps = {
    id: string;
    number: number;
    title: string;
    children: ReactNode;
};

const navigation = [
    { id: "introducao", title: "Introdução" },
    { id: "dados-coletados", title: "Dados que coletamos" },
    { id: "uso-dados", title: "Como usamos seus dados" },
    { id: "bases-legais", title: "Bases legais e LGPD" },
    { id: "compartilhamento", title: "Compartilhamento" },
    { id: "seguranca", title: "Armazenamento e segurança" },
    { id: "direitos", title: "Seus direitos" },
    { id: "cookies", title: "Cookies" },
    { id: "menores", title: "Menores de idade" },
    { id: "alteracoes", title: "Alterações" },
    { id: "contato", title: "Contato" },
];

function PolicySection({ id, number, title, children }: PolicySectionProps) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
            <div className="mb-4 flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-lavender text-xs font-bold text-primary">
                    {number}
                </span>

                <h2 id={`${id}-title`} className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                    {title}
                </h2>
            </div>

            <div className="space-y-4 text-sm leading-7 text-muted sm:text-[15px]">
                {children}
            </div>
        </section>
    );
}

export default function Policy() {
    return (
        <section className="w-full bg-background">
            <Container className="grid items-start gap-8 pb-20 pt-10 sm:pb-28 sm:pt-14 md:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">

                <aside className="md:sticky md:top-28">
                    <nav aria-label="Índice da Política de Privacidade" className="rounded-2xl border border-border bg-surface p-5 shadow-[0_8px_30px_rgba(26,19,48,0.025)]">
                        <h2 className="mb-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">
                            Nesta página
                        </h2>

                        <ol className="flex flex-col">
                            {navigation.map((item, index) => (
                                <li key={item.id} className="border-b border-border/70 last:border-0">
                                    <Link href={`#${item.id}`} className="block py-2.5 text-xs leading-5 text-muted transition-colors duration-200 hover:text-primary">
                                        <span className="mr-1 text-primary">{index + 1}.</span>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </aside>

                <div className="min-w-0">

                    <div className="mb-12 flex items-start gap-3 rounded-2xl border border-primary/20 bg-lavender/70 p-5 sm:p-6">
                        <FiInfo size={20} className="mt-1 shrink-0 text-primary" />

                        <div>
                            <h2 className="text-sm font-extrabold text-foreground">Resumo rápido</h2>

                            <p className="mt-2 text-sm leading-7 text-foreground/80">
                                A Codly busca tratar apenas os dados pessoais necessários para oferecer seus serviços, administrar contas e proporcionar uma experiência de aprendizado gamificada. Você possui direitos sobre seus dados conforme a LGPD e poderá solicitar informações, correções ou exclusão quando cabível.
                            </p>

                            <p className="mt-2 text-xs leading-5 text-muted">Este resumo facilita a leitura, mas não substitui as informações detalhadas abaixo.</p>
                        </div>
                    </div>

                    <div className="space-y-12">

                        <PolicySection id="introducao" number={1} title="Introdução">
                            <p>
                                Esta Política de Privacidade descreve como a <strong className="text-foreground">Codly</strong> pretende coletar, utilizar, armazenar, compartilhar e proteger os dados pessoais dos usuários de sua plataforma de aprendizado de programação.
                            </p>

                            <p>
                                A Codly é uma plataforma educacional gamificada que oferece lições curtas, atividades práticas, desafios, pontos de experiência (XP), rankings e ferramentas para acompanhar o progresso dos estudos.
                            </p>

                            <p>O tratamento de dados pessoais deve observar a Lei Geral de Proteção de Dados Pessoais (LGPD), Lei nº 13.709/2018, e demais normas aplicáveis.</p>

                            <p>Antes da publicação definitiva desta política, serão identificados o responsável pelo tratamento dos dados e os canais oficiais de atendimento.</p>
                        </PolicySection>

                        <PolicySection id="dados-coletados" number={2} title="Dados que coletamos">
                            <p>Conforme as funcionalidades efetivamente disponibilizadas, a Codly poderá tratar as seguintes categorias de informações:</p>

                            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                <li><strong className="text-foreground">Dados de cadastro:</strong> nome, endereço de e-mail, identificador da conta e informações de perfil fornecidas pelo usuário.</li>

                                <li><strong className="text-foreground">Dados de aprendizagem:</strong> lições concluídas, respostas, desafios realizados, XP, conquistas, sequências de estudos e histórico de progresso.</li>

                                <li><strong className="text-foreground">Dados de gamificação:</strong> pontuação, classificação em rankings, conquistas e outras informações relacionadas à evolução do usuário.</li>

                                <li><strong className="text-foreground">Dados de assinatura:</strong> plano contratado, situação da assinatura e informações necessárias à administração da cobrança, caso sejam oferecidos serviços pagos.</li>

                                <li><strong className="text-foreground">Dados técnicos:</strong> informações do dispositivo, navegador, registros de acesso e eventos técnicos necessários ao funcionamento e à segurança da plataforma.</li>

                                <li><strong className="text-foreground">Dados de atendimento:</strong> informações enviadas voluntariamente pelo usuário ao entrar em contato com o suporte.</li>
                            </ul>

                            <p>
                                A coleta efetiva de cada categoria dependerá das funcionalidades implementadas. Dados adicionais serão tratados apenas quando houver finalidade específica e base legal adequada.
                            </p>
                        </PolicySection>

                        <PolicySection id="uso-dados" number={3} title="Como usamos seus dados">
                            <p>Os dados poderão ser utilizados para as seguintes finalidades:</p>

                            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                <li>Criar, autenticar e administrar contas de usuários.</li>
                                <li>Permitir o acesso às atividades e funcionalidades educacionais.</li>
                                <li>Salvar o progresso, as respostas e as conquistas de aprendizagem.</li>
                                <li>Calcular XP, sequências de estudos e posições nos rankings.</li>
                                <li>Administrar assinaturas e disponibilizar funcionalidades conforme o plano contratado.</li>
                                <li>Prevenir fraudes, investigar falhas e proteger a plataforma.</li>
                                <li>Responder solicitações e prestar atendimento aos usuários.</li>
                                <li>Melhorar a experiência de uso e corrigir problemas técnicos.</li>
                                <li>Enviar comunicações opcionais quando houver fundamento legal apropriado.</li>
                            </ul>

                            <p>O tratamento deverá permanecer compatível com as finalidades informadas, respeitando os princípios da necessidade, adequação e transparência.</p>
                        </PolicySection>

                        <PolicySection id="bases-legais" number={4} title="Bases legais e LGPD">
                            <p>
                                A <strong className="text-foreground">Lei Geral de Proteção de Dados Pessoais (LGPD)</strong> estabelece regras para o tratamento de informações relacionadas a pessoas naturais identificadas ou identificáveis.
                            </p>

                            <p>O tratamento de dados pessoais pela Codly deverá estar associado a uma base legal prevista no artigo 7º da LGPD, de acordo com a finalidade de cada operação.</p>

                            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                <li><strong className="text-foreground">Execução de contrato:</strong> quando os dados forem necessários para fornecer funcionalidades e serviços solicitados pelo usuário.</li>

                                <li><strong className="text-foreground">Cumprimento de obrigação legal ou regulatória:</strong> quando a conservação ou utilização dos dados for exigida pela legislação.</li>

                                <li><strong className="text-foreground">Legítimo interesse:</strong> quando aplicável e devidamente justificado, respeitando os direitos e as legítimas expectativas dos titulares.</li>

                                <li><strong className="text-foreground">Consentimento:</strong> quando exigido para determinada finalidade, mediante manifestação livre, informada e inequívoca.</li>

                                <li><strong className="text-foreground">Exercício regular de direitos:</strong> quando necessário em processos judiciais, administrativos ou arbitrais.</li>
                            </ul>

                            <p>
                                O consentimento não é a única base legal permitida pela LGPD. A Codly deverá identificar e documentar o fundamento adequado para cada atividade de tratamento.
                            </p>

                            <Link href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark">
                                Consultar a Lei nº 13.709/2018
                                <FiArrowUpRight size={15} />
                            </Link>
                        </PolicySection>

                        <PolicySection id="compartilhamento" number={5} title="Compartilhamento de dados">
                            <p>
                                Para disponibilizar determinados serviços, poderá ser necessário compartilhar informações com fornecedores que prestem serviços à Codly, respeitando as finalidades informadas e os requisitos da LGPD.
                            </p>

                            <p>Dependendo da arquitetura adotada, esses fornecedores poderão incluir:</p>

                            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                <li>Serviços de hospedagem, infraestrutura e armazenamento.</li>
                                <li>Provedores de autenticação e gerenciamento de contas.</li>
                                <li>Processadores de pagamento e assinaturas.</li>
                                <li>Ferramentas de suporte, segurança e monitoramento técnico.</li>
                            </ul>

                            <p>
                                Os fornecedores efetivamente utilizados e eventuais transferências internacionais deverão ser identificados e avaliados antes da publicação definitiva da política.
                            </p>

                            <p>
                                A Codly não deverá comercializar dados pessoais dos usuários como produto. Qualquer compartilhamento precisará observar uma finalidade legítima e fundamento jurídico adequado.
                            </p>
                        </PolicySection>

                        <PolicySection id="seguranca" number={6} title="Armazenamento e segurança">
                            <p>
                                A Codly deverá adotar medidas técnicas e administrativas apropriadas para proteger os dados pessoais contra acessos não autorizados, perda, alteração, divulgação ou outras formas de tratamento inadequado.
                            </p>

                            <p>Essas medidas poderão incluir, conforme a infraestrutura implementada:</p>

                            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                <li>Comunicações protegidas por HTTPS/TLS.</li>
                                <li>Controle de acesso aos sistemas e bancos de dados.</li>
                                <li>Proteção das credenciais e mecanismos seguros de autenticação.</li>
                                <li>Rotinas de cópia de segurança e recuperação.</li>
                                <li>Monitoramento de falhas e incidentes de segurança.</li>
                                <li>Revisão periódica das permissões e dos mecanismos de proteção.</li>
                            </ul>

                            <p>
                                Os dados pessoais deverão ser mantidos somente pelo período necessário ao cumprimento de suas finalidades, observadas as obrigações legais e as hipóteses de conservação previstas na LGPD.
                            </p>

                            <p>Nenhum sistema é totalmente imune a riscos. A Codly deverá avaliar e aperfeiçoar continuamente suas medidas de proteção.</p>
                        </PolicySection>

                        <PolicySection id="direitos" number={7} title="Seus direitos">
                            <p>De acordo com o artigo 18 da LGPD e demais dispositivos aplicáveis, você possui direitos relacionados ao tratamento dos seus dados pessoais.</p>

                            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                <li>Confirmar se seus dados pessoais estão sendo tratados.</li>
                                <li>Solicitar acesso aos dados pessoais que mantemos sobre você.</li>
                                <li>Solicitar a correção de informações incompletas, inexatas ou desatualizadas.</li>
                                <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados irregularmente.</li>
                                <li>Solicitar portabilidade, observada a regulamentação aplicável.</li>
                                <li>Obter informações sobre compartilhamento de dados.</li>
                                <li>Revogar consentimento quando essa for a base legal do tratamento.</li>
                                <li>Solicitar eliminação de dados tratados com base em consentimento, ressalvadas as hipóteses legais de conservação.</li>
                                <li>Opor-se ao tratamento nas situações previstas pela legislação.</li>
                                <li>Solicitar revisão de decisões exclusivamente automatizadas que afetem seus interesses, quando aplicável.</li>
                            </ul>

                            <p>Os pedidos deverão ser encaminhados ao canal oficial de privacidade da Codly, que será identificado na seção de contato após sua definição.</p>

                            <p>Os direitos estão sujeitos às condições e exceções previstas em lei. A exclusão de uma conta, por exemplo, não implica necessariamente a eliminação imediata de todos os registros quando houver obrigação legal de conservação.</p>

                            <Link href="https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-dark">
                                Conheça seus direitos na ANPD
                                <FiArrowUpRight size={15} />
                            </Link>
                        </PolicySection>

                        <PolicySection id="cookies" number={8} title="Cookies e tecnologias semelhantes">
                            <p>Cookies são pequenos arquivos que podem ser armazenados no navegador para auxiliar o funcionamento de serviços digitais.</p>

                            <p>Dependendo das funcionalidades implementadas, a Codly poderá utilizar cookies ou tecnologias semelhantes para:</p>

                            <ul className="list-disc space-y-2 pl-5 marker:text-primary">
                                <li>Manter sessões autenticadas.</li>
                                <li>Armazenar preferências, como o tema claro ou escuro.</li>
                                <li>Auxiliar na segurança e na prevenção de abusos.</li>
                                <li>Medir o funcionamento e o desempenho da plataforma, quando aplicável.</li>
                            </ul>

                            <p>Cookies estritamente necessários e cookies opcionais deverão ser avaliados de acordo com suas finalidades e bases legais. Quando exigido, será disponibilizado mecanismo para gerenciamento do consentimento.</p>

                            <p>A relação efetiva de cookies e tecnologias de rastreamento será definida após a configuração dos serviços utilizados.</p>
                        </PolicySection>

                        <PolicySection id="menores" number={9} title="Menores de idade">
                            <p>A Codly reconhece que crianças e adolescentes exigem atenção especial no tratamento de seus dados pessoais.</p>

                            <p>O tratamento de dados de crianças e adolescentes deverá observar seu melhor interesse, o artigo 14 da LGPD e a legislação aplicável.</p>

                            <p>Antes de disponibilizar a plataforma a esse público, a Codly deverá definir os requisitos de idade, os mecanismos de informação aos responsáveis e as condições legais aplicáveis ao tratamento de dados.</p>

                            <p>Quando o consentimento de responsável legal for exigido, deverão ser adotadas medidas apropriadas para sua obtenção e verificação.</p>
                        </PolicySection>

                        <PolicySection id="alteracoes" number={10} title="Alterações nesta política">
                            <p>Esta Política de Privacidade poderá ser atualizada para refletir mudanças na plataforma, nas tecnologias utilizadas, nos serviços oferecidos ou nas obrigações legais.</p>

                            <p>A versão publicada deverá indicar sua data de atualização. Quando alterações relevantes exigirem comunicação específica ou novo consentimento, serão adotadas as providências legais aplicáveis.</p>

                            <p>Recomendamos que os usuários consultem periodicamente esta página para conhecer a versão vigente.</p>
                        </PolicySection>

                        <PolicySection id="contato" number={11} title="Contato e solicitações de privacidade">
                            <p>Caso tenha dúvidas sobre esta Política de Privacidade ou deseje exercer seus direitos como titular de dados pessoais, entre em contato com a equipe responsável pela Codly.</p>

                            <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-lavender text-primary">
                                        <FiMail size={19} />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="font-bold text-foreground">Atendimento Codly</h3>
                                        <p className="mt-1 text-sm text-muted">Dúvidas, solicitações e informações sobre privacidade.</p>

                                        <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark">
                                            Acessar página de contato
                                            <FiArrowUpRight size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <p>O canal específico para exercício dos direitos dos titulares, bem como a identificação do responsável pelo tratamento e as informações de contato exigidas pela legislação, deverão constar da versão definitiva desta política.</p>

                            <p>Você também poderá obter informações sobre a LGPD no site da Autoridade Nacional de Proteção de Dados (ANPD).</p>
                        </PolicySection>
                    </div>
                    <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 text-xs text-muted">
                            <FiShield size={16} className="text-primary" />
                            Codly — Privacidade e proteção de dados
                        </div>

                        <Link href="#introducao" className="text-xs font-semibold text-primary transition-colors hover:text-primary-dark">
                            Voltar ao início da política ↑
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
