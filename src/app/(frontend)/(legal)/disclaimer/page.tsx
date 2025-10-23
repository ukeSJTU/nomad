import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "免责声明 - Nomad",
  description: "Nomad 免责声明，说明平台服务的使用限制和责任范围。",
  keywords: ["免责声明", "服务限制", "责任范围", "Nomad"],
};

const sections = [
  { id: "general", title: "总则" },
  { id: "service-nature", title: "服务性质" },
  { id: "information-accuracy", title: "信息准确性" },
  { id: "third-party", title: "第三方服务" },
  { id: "force-majeure", title: "不可抗力" },
  { id: "user-responsibility", title: "用户责任" },
  { id: "liability-limitation", title: "责任限制" },
  { id: "dispute-resolution", title: "争议解决" },
];

export default function DisclaimerPage() {
  return (
    <>
      {/* Header */}
      <header className="mb-8 print:mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 print:text-2xl">
          Nomad 免责声明
        </h1>
        <p className="text-sm text-gray-500">
          最后更新日期：{new Date().toLocaleDateString("zh-CN")}
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="mb-8 p-6 bg-gray-50 rounded-lg print:hidden">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">目录</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {sections.map((section, index) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
            >
              {index + 1}. {section.title}
            </Link>
          ))}
        </div>
      </nav>

      {/* Content */}
      <article className="prose prose-gray max-w-none print:prose-sm">
        {/* Section 1: 总则 */}
        <section id="general" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            1. 总则
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本免责声明适用于 Nomad
            在线旅行服务平台（以下简称&ldquo;本平台&rdquo;）提供的所有服务。使用本平台服务即表示您已阅读、理解并同意接受本免责声明的所有内容。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            本平台有权随时修改本免责声明的任何条款，一旦本免责声明的内容发生变动，本平台将会在网站上公布修改后的免责声明，该公布行为视为本平台已经通知用户修改内容。
          </p>
          <p className="text-gray-700 leading-relaxed">
            如果您不同意本免责声明的修改，请立即停止访问或使用本平台。如果您继续使用本平台，则视为您已接受本免责声明的修改。
          </p>
        </section>

        {/* Section 2: 服务性质 */}
        <section id="service-nature" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            2. 服务性质
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nomad
            是一个在线旅行服务平台，为用户提供机票查询、预订等信息服务。本平台仅作为信息展示和交易撮合的平台，不是航空公司或其他旅游产品供应商。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            本平台展示的所有航班信息、价格等均来自于航空公司或其授权代理商。实际的服务提供者为相应的航空公司或旅游产品供应商，用户与服务提供者之间的权利义务关系由双方自行约定。
          </p>
          <p className="text-gray-700 leading-relaxed">
            本平台不对航空公司或其他服务提供商的服务质量、安全性等承担任何责任。
          </p>
        </section>

        {/* Section 3: 信息准确性 */}
        <section id="information-accuracy" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            3. 信息准确性
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本平台力求提供准确、完整、及时的信息，但由于互联网的特殊性以及信息来源的多样性，本平台无法保证所有信息的绝对准确性和完整性。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            航班时刻、价格、座位情况等信息可能会因各种原因发生变化。本平台建议用户在预订前再次确认相关信息，并以最终确认的信息为准。
          </p>
          <p className="text-gray-700 leading-relaxed">
            对于因信息不准确、不完整或不及时而导致的任何损失，本平台不承担责任。
          </p>
        </section>

        {/* Section 4: 第三方服务 */}
        <section id="third-party" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            4. 第三方服务
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本平台可能包含指向第三方网站或服务的链接。这些第三方网站或服务不受本平台控制，本平台对其内容、隐私政策或做法不承担任何责任。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            用户访问第三方网站或使用第三方服务时，应自行判断其安全性和可靠性，并承担相应的风险。本平台不对因使用第三方服务而产生的任何损失承担责任。
          </p>
          <p className="text-gray-700 leading-relaxed">
            本平台与第三方服务提供商之间的合作关系不构成本平台对该第三方服务的推荐或担保。
          </p>
        </section>

        {/* Section 5: 不可抗力 */}
        <section id="force-majeure" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            5. 不可抗力
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            对于因不可抗力或本平台不能控制的原因造成的网络服务中断或其他缺陷，本平台不承担任何责任。不可抗力包括但不限于：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>自然灾害，如台风、地震、洪水、雷击等</li>
            <li>政府行为，如征收、征用、法律法规变更等</li>
            <li>社会异常事件，如罢工、骚乱、战争等</li>
            <li>技术原因，如互联网故障、电力故障、计算机病毒、黑客攻击等</li>
            <li>其他本平台无法预见、无法避免且无法克服的客观情况</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            在不可抗力事件发生时，本平台将尽力减少对用户造成的影响，但对于因此造成的任何损失，本平台不承担责任。
          </p>
        </section>

        {/* Section 6: 用户责任 */}
        <section id="user-responsibility" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            6. 用户责任
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            用户在使用本平台服务时，应遵守相关法律法规，不得从事以下行为：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>发布或传播违法、有害、虚假、侵权的信息</li>
            <li>侵犯他人知识产权、商业秘密或其他合法权益</li>
            <li>恶意注册账号、虚假交易、刷单炒信等扰乱平台秩序的行为</li>
            <li>利用技术手段破坏或试图破坏平台的正常运行</li>
            <li>其他违反法律法规或本平台规定的行为</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mb-4">
            用户应对其在本平台上的所有行为承担全部责任。因用户行为导致的任何法律后果，由用户自行承担，本平台不承担任何责任。
          </p>
          <p className="text-gray-700 leading-relaxed">
            如因用户的违法或违规行为给本平台或第三方造成损失的，用户应承担相应的赔偿责任。
          </p>
        </section>

        {/* Section 7: 责任限制 */}
        <section id="liability-limitation" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            7. 责任限制
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            在法律允许的最大范围内，本平台对以下情况不承担任何责任：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>
              用户因使用或无法使用本平台服务而遭受的任何直接、间接、偶然、特殊或后果性的损害
            </li>
            <li>用户通过本平台购买的产品或服务的质量、安全性等问题</li>
            <li>航空公司或其他服务提供商的服务变更、延误、取消等造成的损失</li>
            <li>
              用户个人信息泄露、账号被盗等安全问题（本平台已尽到安全保障义务的除外）
            </li>
            <li>因用户自身原因（如操作失误、信息填写错误等）造成的损失</li>
            <li>其他非因本平台故意或重大过失造成的损失</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            即使本平台已被告知可能发生此类损害，本平台也不对上述损害承担责任。
          </p>
        </section>

        {/* Section 8: 争议解决 */}
        <section id="dispute-resolution" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            8. 争议解决
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本免责声明的解释、效力及纠纷的解决，适用中华人民共和国法律。若用户和本平台之间发生任何纠纷或争议，首先应友好协商解决。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            协商不成的，任何一方均可向本平台所在地有管辖权的人民法院提起诉讼。
          </p>
          <p className="text-gray-700 leading-relaxed">
            本免责声明的任何条款无论因何种原因无效或不可执行，其余条款仍然有效，对双方具有约束力。
          </p>
        </section>

        {/* Additional Notice */}
        <section className="mb-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded">
          <h3 className="text-lg font-semibold mb-3 text-gray-900">特别提示</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            本平台提醒用户在使用服务前，应仔细阅读并充分理解本免责声明的全部内容。如有任何疑问，请及时联系本平台客服。
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            用户在预订机票或其他旅游产品时，应仔细核对个人信息、航班信息、价格等重要内容，确保信息准确无误。
          </p>
          <p className="text-gray-700 leading-relaxed">
            建议用户购买相应的旅行保险，以降低旅行过程中可能遇到的风险。
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200 print:mt-8">
        <p className="text-sm text-gray-500 text-center">
          如您对本免责声明有任何疑问，请联系我们的客服团队。
        </p>
      </footer>
    </>
  );
}
