import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "服务协议 - Nomad",
  description:
    "Nomad 用户服务协议，详细说明用户在使用 Nomad 平台服务时的权利和义务。",
  keywords: ["服务协议", "用户协议", "服务条款", "Nomad"],
};

const sections = [
  { id: "general", title: "总则" },
  { id: "service-provider", title: "服务商介绍" },
  { id: "modification", title: "服务条款的修改" },
  { id: "service-change", title: "服务变更、中断、终止" },
  { id: "usage-rules", title: "使用规则" },
  { id: "copyright", title: "版权声明" },
  { id: "privacy", title: "用户隐私保护" },
  { id: "account-security", title: "用户的账号、密码和安全性" },
  { id: "no-warranty", title: "拒绝提供担保" },
  { id: "limited-liability", title: "有限责任" },
  { id: "storage-limit", title: "特殊网络会员服务条款的存储限制" },
  { id: "user-management", title: "用户管理" },
  { id: "user-breach", title: "用户的违约责任" },
  { id: "guarantee", title: "保障" },
  { id: "termination", title: "结束服务" },
  { id: "notice", title: "通告" },
  { id: "advertising", title: "参与广告策划" },
  { id: "content-ownership", title: "网络内容的所有权" },
  { id: "law", title: "法律" },
];

export default function TermsOfServicePage() {
  return (
    <>
      {/* Header */}
      <header className="mb-8 print:mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 print:text-2xl">
          Nomad 用户服务协议
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
            欢迎您使用 Nomad
            在线旅行服务平台（以下简称&ldquo;本平台&rdquo;）。本协议是您与 Nomad
            之间关于您使用本平台服务所订立的协议。
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            在您注册成为本平台用户前，请您务必仔细阅读并充分理解本协议的全部内容，特别是免除或限制责任的条款、法律适用和争议解决条款。如您对本协议有任何疑问，可向本平台客服咨询。
          </p>
          <p className="text-gray-700 leading-relaxed">
            当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容。
          </p>
        </section>

        {/* Section 2: 服务商介绍 */}
        <section id="service-provider" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            2. 服务商介绍
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nomad
            是一个现代化的在线旅行社（OTA）平台，致力于为用户提供简洁直观、价格透明、无干扰的机票预订体验。
          </p>
          <p className="text-gray-700 leading-relaxed">
            本平台由 Nomad
            团队开发和运营，我们承诺为用户提供优质、安全、便捷的在线旅行服务。
          </p>
        </section>

        {/* Section 3: 服务条款的修改 */}
        <section id="modification" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            3. 服务条款的修改
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nomad
            有权根据需要不时地修改本协议或根据本协议制定、修改各类规则，并以网站公示的方式进行公告，不再单独通知您。
          </p>
          <p className="text-gray-700 leading-relaxed">
            变更后的协议和规则一经公布即生效，并成为本协议的一部分。如您不同意相关变更，应当立即停止使用本平台服务。您继续使用本平台服务的，即表明您接受修订后的协议和规则。
          </p>
        </section>

        {/* Section 4: 服务变更、中断、终止 */}
        <section id="service-change" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            4. 服务变更、中断、终止
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nomad
            可能会对服务内容进行变更，也可能会中断、中止或终止服务。您理解并同意，Nomad
            可自行全权决定，因任何理由，包含但不限于缺乏使用，或 Nomad
            认为您已经违反本服务协议的文字及精神，终止您的密码、账号或本服务之使用（或服务之任何部分），并将您在本服务内任何内容加以移除并删除。
          </p>
          <p className="text-gray-700 leading-relaxed">
            您同意依本服务协议任何规定提供之本服务，无需进行事先通知即可中断或终止，您承认并同意，Nomad
            可立即关闭或删除您的账号及您账号中所有相关信息及文件，及/或禁止继续使用前述文件或本服务。
          </p>
        </section>

        {/* Section 5: 使用规则 */}
        <section id="usage-rules" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            5. 使用规则
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            您在使用本平台服务时，必须遵守中华人民共和国相关法律法规的规定，您应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>
              上载、张贴、发送或传送任何非法、有害、威胁、辱骂、骚扰、侵权、中伤、粗俗、猥亵、诽谤、侵害他人隐私、种族歧视或其他令人反感的内容
            </li>
            <li>伤害未成年人的任何方式</li>
            <li>
              冒充任何人或机构，或以虚伪不实的方式谎称或使人误认为与任何人或机构有关
            </li>
            <li>
              伪造标题或以其他方式操控识别资料，使人误认为该内容为 Nomad 所传送
            </li>
            <li>
              将无权传送的内容（例如内部资料、机密资料）进行上载、张贴、发送电子邮件或以其他方式传送
            </li>
          </ul>
        </section>

        {/* Section 6: 版权声明 */}
        <section id="copyright" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            6. 版权声明
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nomad
            平台上所有内容，包括但不限于文字、软件、声音、图片、录像、图表、网站架构、网站画面的安排、网页设计，均由
            Nomad
            或其他权利人依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。
          </p>
          <p className="text-gray-700 leading-relaxed">
            非经 Nomad
            或其他权利人书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表本平台上的内容。
          </p>
        </section>

        {/* Section 7: 用户隐私保护 */}
        <section id="privacy" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            7. 用户隐私保护
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            保护用户隐私是 Nomad
            的一项基本政策。您提供的登记资料及本平台保留的有关您的若干其他资料将受到中国有关隐私的法律和本平台《个人信息保护政策》之规范。
          </p>
          <p className="text-gray-700 leading-relaxed">
            详细信息请参阅我们的
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              《个人信息保护政策》
            </Link>
            。
          </p>
        </section>

        {/* Section 8: 用户的账号、密码和安全性 */}
        <section id="account-security" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            8. 用户的账号、密码和安全性
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            您一旦注册成功成为用户，您将得到一个密码和账号。如果您未保管好自己的账号和密码而对您、Nomad
            或第三方造成的损害，您将负全部责任。
          </p>
          <p className="text-gray-700 leading-relaxed">
            另外，每个用户都要对其账号中的所有活动和事件负全责。您可随时改变您的密码和图标，也可以结束旧的账号重开一个新账号。用户同意若发现任何非法使用用户账号或安全漏洞的情况，立即通告
            Nomad。
          </p>
        </section>

        {/* Section 9-19: Simplified sections */}
        <section id="no-warranty" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            9. 拒绝提供担保
          </h2>
          <p className="text-gray-700 leading-relaxed">
            用户明确同意使用本平台服务的风险由用户个人承担。本平台不担保服务一定能满足用户的要求，也不担保服务不会中断，对服务的及时性、安全性、准确性都不作担保。
          </p>
        </section>

        <section id="limited-liability" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            10. 有限责任
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Nomad
            对任何直接、间接、偶然、特殊及继起的损害不负责任，这些损害可能来自：不正当使用本平台服务，在网上购买商品或类似服务，在网上进行交易，非法使用服务或用户传送的信息有所变动。
          </p>
        </section>

        <section id="storage-limit" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            11. 特殊网络会员服务条款的存储限制
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Nomad 不对用户所发布信息的删除或储存失败负责。Nomad
            有判定用户的行为是否符合本平台服务条款的要求和精神的保留权利，如果用户违背了服务条款的规定，Nomad
            有中断对其提供服务的权利。
          </p>
        </section>

        <section id="user-management" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            12. 用户管理
          </h2>
          <p className="text-gray-700 leading-relaxed">
            用户必须遵循：使用本平台服务不作非法用途；不干扰或混乱网络服务；遵守所有使用服务的网络协议、规定、程序和惯例。用户的行为准则是以因特网法规，政策、程序和惯例为根据的。
          </p>
        </section>

        <section id="user-breach" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            13. 用户的违约责任
          </h2>
          <p className="text-gray-700 leading-relaxed">
            如果 Nomad 发现或收到他人举报或投诉用户违反本协议约定的，Nomad
            有权不经通知随时对相关内容进行删除，并视行为情节对违规账号处以包括但不限于警告、限制或禁止使用全部或部分功能、账号封禁直至注销的处罚，并公告处理结果。
          </p>
        </section>

        <section id="guarantee" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            14. 保障
          </h2>
          <p className="text-gray-700 leading-relaxed">
            用户同意保障和维护 Nomad
            全体成员的利益，负责支付由用户使用超出服务范围引起的律师费用，违反服务条款的损害补偿费用，其它人使用用户的电脑、账号和其它知识产权的追索费。
          </p>
        </section>

        <section id="termination" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            15. 结束服务
          </h2>
          <p className="text-gray-700 leading-relaxed">
            用户或 Nomad 可随时根据实际情况中断一项或多项服务。Nomad
            不需对任何个人或第三方负责而随时中断服务。用户若反对任何服务条款的建议或对后来的条款修改有异议，或对本平台服务不满，用户可以行使如下权利：不再使用本平台服务；结束用户使用本平台服务的资格；通告本平台停止该用户的服务。
          </p>
        </section>

        <section id="notice" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            16. 通告
          </h2>
          <p className="text-gray-700 leading-relaxed">
            所有发给用户的通告都可通过电子邮件或常规的信件传送。本平台会通过邮件服务发报消息给用户，告诉他们服务条款的修改、服务变更、或其它重要事情。
          </p>
        </section>

        <section id="advertising" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            17. 参与广告策划
          </h2>
          <p className="text-gray-700 leading-relaxed">
            用户在本平台上进行的任何交易或参与的任何促销活动，包括付款和交货，以及与此类交易相关的任何其他条款、条件、保证或声明，仅限于用户与广告商之间。用户因前述任何交易或前述广告商而遭受的任何性质的任何损失或损害，Nomad
            概不负责。
          </p>
        </section>

        <section id="content-ownership" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            18. 网络内容的所有权
          </h2>
          <p className="text-gray-700 leading-relaxed">
            本平台定义的内容包括：文字、软件、声音、相片、录像、图表；在广告中全部内容；本平台为用户提供的商业信息。所有这些内容受版权、商标、标签和其它财产所有权法律的保护。
          </p>
        </section>

        <section id="law" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            19. 法律
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向
            Nomad 所在地的人民法院提起诉讼。
          </p>
          <p className="text-gray-700 leading-relaxed">
            本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。
          </p>
        </section>
      </article>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200 print:mt-8">
        <p className="text-sm text-gray-500 text-center">
          如您对本协议有任何疑问，请联系我们的客服团队。
        </p>
      </footer>
    </>
  );
}
