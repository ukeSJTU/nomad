import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "个人信息保护政策 - Nomad",
  description:
    "Nomad 个人信息保护政策，详细说明我们如何收集、使用、存储和保护您的个人信息。",
  keywords: ["隐私政策", "个人信息保护", "数据安全", "Nomad"],
};

const sections = [
  { id: "introduction", title: "引言" },
  { id: "collection", title: "我们如何收集您的个人信息" },
  { id: "usage", title: "我们如何使用您的个人信息" },
  { id: "sharing", title: "我们如何共享、转让、公开披露您的个人信息" },
  { id: "storage", title: "我们如何存储和保护您的个人信息" },
  { id: "rights", title: "您的权利" },
  { id: "minors", title: "未成年人保护" },
  { id: "cookies", title: "Cookie 和类似技术" },
  { id: "updates", title: "本政策的更新" },
  { id: "contact", title: "如何联系我们" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Header */}
      <header className="mb-8 print:mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 print:text-2xl">
          Nomad 个人信息保护政策
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
        {/* Section 1: 引言 */}
        <section id="introduction" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            1. 引言
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Nomad（以下简称&ldquo;我们&rdquo;）深知个人信息对您的重要性，我们将按照法律法规的规定，保护您的个人信息及隐私安全。我们制定本《个人信息保护政策》（以下简称&ldquo;本政策&rdquo;）并特别提示：
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            本政策适用于 Nomad
            提供的所有产品和服务。如我们关联公司的产品或服务中使用了 Nomad
            提供的产品或服务但未设独立隐私政策的，则本政策同样适用于该部分产品或服务。
          </p>
          <p className="text-gray-700 leading-relaxed">
            在使用 Nomad
            各项产品或服务前，请您务必仔细阅读并透彻理解本政策，在确认充分理解并同意后使用相关产品或服务。一旦您开始使用
            Nomad 各项产品或服务，即表示您已充分理解并同意本政策。
          </p>
        </section>

        {/* Section 2: 我们如何收集您的个人信息 */}
        <section id="collection" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            2. 我们如何收集您的个人信息
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们会遵循正当、合法、必要的原则，出于本政策所述的以下目的，收集和使用您在使用服务过程中主动提供或因使用我们产品和/或服务而产生的个人信息：
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            2.1 账号注册
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            当您注册 Nomad
            账号时，我们会收集您的手机号码、电子邮箱地址、密码等信息。收集这些信息是为了帮助您完成注册，保护您的账号安全。
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            2.2 订单信息
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            当您使用我们的机票预订服务时，我们会收集您的订单信息，包括但不限于：乘机人姓名、证件类型、证件号码、联系电话、航班信息等。这些信息是完成订单所必需的。
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            2.3 设备信息
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            为了提供更好的产品和服务，我们会收集您的设备信息，包括设备型号、操作系统版本、设备标识符、IP
            地址等。这些信息帮助我们进行故障排查、数据分析和安全防护。
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            2.4 日志信息
          </h3>
          <p className="text-gray-700 leading-relaxed">
            当您使用我们的服务时，我们会自动收集您的详细使用情况，作为有关网络日志保存。包括您的搜索查询内容、IP
            地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。
          </p>
        </section>

        {/* Section 3: 我们如何使用您的个人信息 */}
        <section id="usage" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            3. 我们如何使用您的个人信息
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们会出于以下目的，收集和使用您的个人信息：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>向您提供机票预订、订单管理等核心服务</li>
            <li>维护、改进我们的产品和服务，开发新的产品和服务</li>
            <li>向您发送服务相关的通知，如订单确认、航班变动提醒等</li>
            <li>处理您的客服请求和投诉</li>
            <li>进行内部审计、数据分析和研究，改善我们的产品和服务</li>
            <li>保护我们的服务安全，防止欺诈、滥用等违法违规行为</li>
            <li>遵守法律法规和监管要求</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            我们会在征得您明确同意后，将信息用于本政策未载明的其他用途，或将基于特定目的收集而来的信息用于其他目的。
          </p>
        </section>

        {/* Section 4: 我们如何共享、转让、公开披露您的个人信息 */}
        <section id="sharing" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            4. 我们如何共享、转让、公开披露您的个人信息
          </h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">4.1 共享</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们不会与 Nomad
            以外的任何公司、组织和个人共享您的个人信息，但以下情况除外：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>在获取明确同意的情况下共享</li>
            <li>
              根据法律法规的规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求
            </li>
            <li>
              与我们的关联公司共享：您的个人信息可能会与我们的关联公司共享。我们只会共享必要的个人信息，且受本政策中所声明目的的约束
            </li>
            <li>
              与授权合作伙伴共享：仅为实现本政策中声明的目的，我们的某些服务将由授权合作伙伴提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">4.2 转让</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>在获取明确同意的情况下转让</li>
            <li>
              在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            4.3 公开披露
          </h3>
          <p className="text-gray-700 leading-relaxed">
            我们仅会在以下情况下，公开披露您的个人信息：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>获得您明确同意后</li>
            <li>
              基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情况下
            </li>
          </ul>
        </section>

        {/* Section 5: 我们如何存储和保护您的个人信息 */}
        <section id="storage" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            5. 我们如何存储和保护您的个人信息
          </h2>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            5.1 存储地点
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们会按照法律法规规定，将境内收集的用户个人信息存储于中国境内。
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            5.2 存储期限
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们仅在为提供 Nomad
            服务之目的所必需的期间内保留您的个人信息。当我们的产品或服务发生停止运营的情形时，我们将以推送通知、公告等形式通知您，并在合理的期限内删除您的个人信息或进行匿名化处理。
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            5.3 安全措施
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们努力为用户的信息安全提供保障，以防止信息的丢失、不当使用、未经授权访问或披露。我们使用各种安全技术和程序，以保护您的个人信息不被未经授权的访问、使用或泄漏。
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li>我们会使用加密技术确保数据的保密性</li>
            <li>我们会使用受信赖的保护机制防止数据遭到恶意攻击</li>
            <li>我们会部署访问控制机制，确保只有授权人员才可访问个人信息</li>
            <li>
              我们会举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识
            </li>
          </ul>
        </section>

        {/* Section 6: 您的权利 */}
        <section id="rights" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            6. 您的权利
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法，我们保障您对自己的个人信息行使以下权利：
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            6.1 访问您的个人信息
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            您有权访问您的个人信息，法律法规规定的例外情况除外。您可以通过以下方式自行访问您的个人信息：账户信息、订单信息、常用旅客信息等。
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            6.2 更正您的个人信息
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以通过个人中心自行更正，或通过客服联系我们进行更正。
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            6.3 删除您的个人信息
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            在以下情形中，您可以向我们提出删除个人信息的请求：
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4 ml-4">
            <li>如果我们处理个人信息的行为违反法律法规</li>
            <li>如果我们收集、使用您的个人信息，却未征得您的同意</li>
            <li>如果我们处理个人信息的行为违反了与您的约定</li>
            <li>如果您不再使用我们的产品或服务，或您注销了账号</li>
            <li>如果我们不再为您提供产品或服务</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            6.4 注销您的账号
          </h3>
          <p className="text-gray-700 leading-relaxed">
            您可以通过联系客服的方式申请注销您的账号。在您注销账号后，我们将停止为您提供产品或服务，并依据您的要求，删除您的个人信息，法律法规另有规定的除外。
          </p>
        </section>

        {/* Section 7: 未成年人保护 */}
        <section id="minors" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            7. 未成年人保护
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们非常重视对未成年人个人信息的保护。若您是 18
            周岁以下的未成年人，在使用我们的产品和/或服务前，应事先取得您的家长或法定监护人的同意。
          </p>
          <p className="text-gray-700 leading-relaxed">
            若您是未成年人的监护人，当您对您所监护的未成年人的个人信息有相关疑问时，请通过本政策公示的联系方式与我们联系。
          </p>
        </section>

        {/* Section 8: Cookie 和类似技术 */}
        <section id="cookies" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            8. Cookie 和类似技术
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            为确保网站正常运转，我们会在您的计算机或移动设备上存储名为 Cookie
            的小数据文件。Cookie
            通常包含标识符、站点名称以及一些号码和字符。借助于
            Cookie，网站能够存储您的偏好等数据。
          </p>
          <p className="text-gray-700 leading-relaxed">
            我们不会将 Cookie
            用于本政策所述目的之外的任何用途。您可根据自己的偏好管理或删除
            Cookie。您可以清除计算机上保存的所有
            Cookie，大部分网络浏览器都设有阻止 Cookie
            的功能。但如果您这么做，则需要在每一次访问我们的网站时亲自更改用户设置。
          </p>
        </section>

        {/* Section 9: 本政策的更新 */}
        <section id="updates" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            9. 本政策的更新
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            我们可能适时修订本政策的条款，该等修订构成本政策的一部分。如该等修订造成您在本政策下权利的实质减少，我们将在修订生效前通过在主页上显著位置提示或向您发送电子邮件或以其他方式通知您。
          </p>
          <p className="text-gray-700 leading-relaxed">
            在该种情况下，若您继续使用我们的服务，即表示同意受经修订的本政策的约束。
          </p>
        </section>

        {/* Section 10: 如何联系我们 */}
        <section id="contact" className="mb-8 scroll-mt-4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 print:text-xl">
            10. 如何联系我们
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            如果您对本隐私政策有任何疑问、意见或建议，可以通过以下方式与我们联系：
          </p>
          <ul className="list-none text-gray-700 space-y-2 ml-4">
            <li>
              <strong>客服邮箱：</strong> privacy@nomad.example.com
            </li>
            <li>
              <strong>客服电话：</strong> 400-XXX-XXXX
            </li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            一般情况下，我们将在 15
            个工作日内回复。如果您对我们的回复不满意，特别是我们的个人信息处理行为损害了您的合法权益，您还可以向网信、电信、公安及工商等监管部门进行投诉或举报。
          </p>
        </section>
      </article>
    </>
  );
}
