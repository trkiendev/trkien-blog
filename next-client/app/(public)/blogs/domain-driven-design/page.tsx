      import Image from "next/image";
      import Callout from "@/components/callout/callout";
      import CodeBlock from "@/components/code/codeBlock";
      import { spaceMono } from "../../font";
      import blogCss from "../blog.module.css";

      export default function DomainDrivenDesign() {
            return (
                  <>
                        <div className="flex gap-2">
                              <div className="flex flex-col gap-4">
                                    <h1>
                                          DDD: Domain Driven Design
                                    </h1>
                                    <div className="tag-list">
                                          <ul className="flex gap-2">
                                                <li className="tag-item">
                                                      <a href="">DDD</a>
                                                </li>
                                                <li className="tag-item">
                                                      <a href="">ERP</a>
                                                </li>
                                                <li className="tag-item">
                                                      <a href="">Software Architect</a>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                              <div className="relative w-[720px] h-[405px] rounded-lg overflow-hidden">
                                    <Image src="/thumbnails/domain-driven-design-thumbnail.png" alt="thumbnail" fill />
                              </div>
                        </div>
                        
                        <div className="mt-[50px]">
                              <p className="paragraph">
                                    Sau 1 khoảng thời gian khá dài phát triển dự án ERP theo cách tiếp cận DDD, bản thân mình đã đọc qua nhiều tải liệu về DDD cũng như cách áp dụng vào dự án thực tế là như thế.
                                    <br></br>
                                    Mình viết bài viết này để chia sẻ hiểu biết và trải nghiệm của mình sau khi học và áp dụng DDD vào project thực tế, bài viết sẽ tập trung trả lời câu hỏi: what, why, when và các ví dụ cho từng nội dung.
                                    <br></br>
                                    Kiến thức và kinh nghiệm của mình cũng chưa nhiều nên có thể sẽ có những sai sót trong bài viết. Mình sẽ rất vui nếu đọc giả có thể chỉ ra và giúp mình hoàn thiện nội dung bài viết hơn.
                              </p>
                        </div>

                        <div>
                              <h2>Hiểu về DDD: Domain Driven Design</h2>

                              <div>
                                    <h3>WHAT</h3>
                                    <p className="paragraph">
                                          DDD (Domain Driven Design) <strong>không phải là một pattern hay một framework cụ thể</strong>, mà là một <strong>triết lý xây dựng hệ thống phần mềm xoay quanh nghiệp vụ của doanh nghiệp</strong>. 
                                          Vì tập trung vào nghiệp vụ, nên hiệu quả của DDD phụ thuộc rất nhiều vào việc người xây dựng hệ thống <strong>hiểu nghiệp vụ đến đâu</strong>.
                                    </p>
                                    <p className="paragraph">
                                          Theo trải nghiệm cá nhân của mình, DDD phát huy giá trị rõ rệt nhất khi được áp dụng vào các <strong>hệ thống ERP</strong> của doanh nghiệp.
                                          Mỗi doanh nghiệp đều có quy trình nghiệp vụ riêng: có nơi đơn giản, có nơi rất phức tạp. 
                                          Và trong thực tế làm việc khoảng gần 1.5 năm, mình nhận ra một điều: nghiệp vụ doanh nghiệp gần như không bao giờ đứng yên.
                                    </p>

                                    <div>
                                          Nghiệp vụ có thể thay đổi do:
                                          <ul className="bullet-list">
                                                <li>điều chỉnh chiến lược kinh doanh</li>
                                                <li>tối ưu lại quy trình vận hành,</li>
                                                <li>hoặc thay đổi theo chính sách, quy định của nhà nước.</li>
                                          </ul>
                                          Vì vậy, việc hệ thống phải liên tục thay đổi để đáp ứng nghiệp vụ mới là điều tất yếu.
                                    </div>

                                    <h4>Khi CRUD không còn đủ</h4>
                                    Trong nhiều hệ thống ERP, đặc biệt ở giai đoạn đầu, hệ thống thường được xây dựng theo hướng <strong>CRUD thuần :</strong> 
                                    <blockquote>
                                          người dùng nhập dữ liệu → hệ thống lưu xuống database → hiển thị dữ liệu ra client → chỉnh sửa, xoá, cập nhật.
                                    </blockquote>                                   
                                    Cách làm này ban đầu có thể đơn giản, nhanh và chạy rất mượt. 
                                    Tuy nhiên, khi quy trình nghiệp vụ mở rộng, đặc biệt trong các lĩnh vực như tài chính, sản xuất, quản trị, hệ thống sẽ dần trở nên phức tạp và khó kiểm soát nếu chỉ dựa vào CRUD và các đoạn  
                                    <span className={`${spaceMono.className} ${blogCss.codeColor}`}> if-else </span> rải rác.

                                    <h4>Ví dụ từ 1 hệ thống ERP thực tế</h4>
                                    <p>
                                          Một hệ thống ERP mình từng tham gia triển khai là hệ thống quản lý <strong>các chứng từ thanh toán và tạm ứng</strong> cho quy mô tập đoàn.
                                          <br />
                                          Quy trình nghiệp vụ không chỉ đơn giản là: <span className="highlight-blue-fg">tạo form → gửi duyệt → user bấm duyệt là xong</span> .
                                    </p>
                                    <div>
                                          Thực tế phức tạp hơn rất nhiều:
                                          <ul className="bullet-list">
                                                <li>Mỗi đề nghị thanh toán phải dựa trên kế hoạch ngân sách <strong>đã được duyệt</strong> từ đầu tháng.</li>
                                                <li>Mỗi kế hoạch ngân sách có <strong>mã ngân sách và tên ngân sách riêng</strong>, và không được trùng mã trong cùng phòng ban.</li>
                                                <li>Mỗi mã ngân sách lại <strong>tham chiếu đến mã dòng tiền chi</strong>.</li>
                                                <li>Đề nghị thanh toán được phép <strong>vượt tối đa 5% ngân sách</strong>.</li>
                                                <li>Sau khi đề nghị được duyệt hoàn toàn, kế toán mới tạo lệnh chi, và việc này có thể diễn ra trễ.</li>
                                                <li>Một đề nghị thanh toán có thể phát sinh nhiều <strong>khoản tiền chi</strong>.</li>
                                          </ul>
                                          Tất cả những ràng buộc trên có thể coi là các quy tắc nghiệp vụ (business rules) của hệ thống.
                                    </div>

                                    <h4>Vấn dề</h4>
                                    Những quy tắc này không chỉ xuất hiện ở một chỗ, mà lặp lại ở nhiều quy trình khác nhau.
                                    <br />
                                    Ví dụ
                                    <ul className="bullet-list">
                                          <li>Khi tạo đề nghị thanh toán → không được vượt ngân sách.</li>
                                          <li>Khi tạo đề nghị tạm ứng → cũng không được vượt ngân sách.</li>
                                    </ul>
                                    <p>
                                          Nếu mỗi lần xử lý nghiệp vụ, hệ thống lại: truy vấn kế hoạch ngân sách từ database, rồi viết các đoạn kiểm tra kiểu như:    
                                    </p> 

      <CodeBlock language="csharp"
      code={`
      if (expenseRequest.Amount > budgetPlan.Amount)
      {
            // Logic kiểm tra vượt ngân sách
      }`}/>

                                    <p>thì logic nghiệp vụ sẽ nhanh chóng bị trùng lặp, phân tán và khó bảo trì.</p>
                                    

                                    <h4>Cách tiếp cận theo DDD</h4>
                                    Trong cách tiếp cận DDD, những đoạn kiểm tra như vậy không chỉ đơn thuần là điều kiện kỹ thuật , mà là <strong>một phần của nghiệp vụ</strong>. 
                                    Vì thế, thay vì đặt chúng rải rác ở nhiều nơi, ta đưa chúng vào chính đối tượng nghiệp vụ liên quan. 
                                    <br />
                                    Ví dụ, quy tắc “kiểm tra số tiền có vượt ngân sách hay không” được đặt vào entity 
                                    <span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetPlan </span>
                                    

      <CodeBlock language="csharp"
      code={`
      bool IsValid(Money amount)
      `}/>

                                    Từ đó, mọi nghiệp vụ liên quan đến ngân sách chỉ cần gọi hành vi này của <span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetPlan </span>, thay vì tự kiểm tra theo cách riêng.

                                    <br />
                                    Lúc này, BudgetPlan không còn chỉ là một object chứa dữ liệu, mà trở thành một mô hình nghiệp vụ (domain model) với các ràng buộc rõ ràng. Các đối tượng khác như:
                                    <ul className="bullet-list">
                                          <li><span className={`${spaceMono.className} ${blogCss.codeColor}`} > ExpensePayment </span> (đề nghị thanh toán),</li>
                                          <li><span className={`${spaceMono.className} ${blogCss.codeColor}`} > AdvancePayment </span> (đề nghị tạm ứng),</li>
                                          <li><span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetTransaction </span> (ghi nhận giao dịch),</li>
                                    </ul>
                                    khi cần tương tác với ngân sách đều phải thông qua các <strong>hành vi nghiệp vụ đã được định nghĩa sẵn</strong> trong domain.

                                    <Callout>
                                          DDD không tập trung vào database hay CRUD, mà tập trung vào việc hiện thực hoá nghiệp vụ của doanh nghiệp một cách rõ ràng và nhất quán trong mã nguồn.
                                    </Callout>
                              </div>

                              <div>
                                    <h3>WHERE</h3>
                                    <p>
                                          Vậy có phải hệ thống ERP nào cũng nên áp dụng DDD ❓
                                          <br />
                                          Câu trả lời là không phải lúc nào cũng phù hợp. 
                                          Việc quyết định có áp dụng DDD hay không cần cân nhắc dựa trên đặc thù nghiệp vụ, quy mô hệ thống và năng lực đội ngũ, thay vì xem DDD như một “chuẩn bắt buộc”.
                                    </p>
                                    <div>
                                          <h4 className="section-title">Điểm mạnh</h4>
                                          <ul className="bullet-list">
                                                <li>
                                                      <strong>Code dễ bảo trì</strong>
                                                      <br />
                                                      Khi toàn bộ quy tắc nghiệp vụ được đặt trong domain entity (<span className={`${spaceMono.className} ${blogCss.codeColor}`} > ExpensePayment </span>, <span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetPlan </span>), mỗi quy tắc chỉ tồn tại một nơi duy nhất. 
                                                      <br />
                                                      Điều này giúp tránh việc cùng một nghiệp vụ nhưng được kiểm tra theo nhiều cách khác nhau ở controller, service hoặc query handler, dẫn đến khó bảo trì trong các hệ thống ERP lớn.
                                                </li>
                                                <li>
                                                <strong>Ngôn ngữ chung (Ubiquitous Language)</strong>
                                                <br />
                                                Toàn bộ chi tiết, thao tác nghiệp vụ sẽ được diễn giải bên trong class domain entity thì source code trở thành tài liệu nghiệp vụ sống, 
                                                nhờ đó mà các lập trình viên join dự án có thể hiểu nghiệp vụ và giao tiếp với các domain expert hay yêu cầu của khách hàng {`giảm rủi ro hiểu sai nghiệp vụ giữa khách hàng, BA, dev`}.
                                                <br />
                                                </li>
                                                <li>
                                                      <strong>Khả năng mở rộng linh hoạt</strong>
                                                      <br />
                                                      Trong các hệ thống áp dụng DDD, 1 nghiệp vụ lớn có thể chia thành nhiều nghiệp vụ nhỏ: <span className={blogCss.highlightText}>bounded context</span> để giảm độ phức tạp (giống với ý tưởng chia để trị: divide & conquere).
                                                      Mỗi context đảm nhận một phần nghiệp vụ riêng biệt, giúp quản lý và phát triển độc lập từng phần mà không ảnh hưởng toàn cụ. 
                                                      <br />
                                                      Vì vậy mà nếu khi nghiệp vụ có sự thay đổi hoặc cần mở rộng thì , chỉ cần cập nhật phần liên quan mà hệ thống tổng thể ít bị ảnh hưởng. 
                                                      Khả năng này làm cho hệ thống dễ thích ứng với yêu cầu mới và mở rộng quy mô (scalability) hiệu quả hơn
                                                </li>
                                                <li>
                                                      <strong>Đáp ứng tốt nghiệp vụ phức tạp</strong>
                                                      <br />
                                                      Với các hệ thống doanh nghiệp lớn (ERP, tài chính, sản xuất…) có nhiều quy tắc nghiệp vụ phức tạp, DDD cho phép biểu diễn rõ ràng các luật này trên mã nguồn. 
                                                      Mô hình nghiệp vụ được thiết kế tỉ mỉ giúp phần mềm gắn sát mục tiêu kinh doanh nên khi cần thay đổi nghiệp vụ (ví dụ thay đổi quy tắc vượt ngân sách), DDD giúp việc cập nhật mã nguồn trở nên dễ dàng hơn nhờ tất cả liên quan đều hiểu cùng ngôn ngữ chung
                                                      Điều này nâng cao chất lượng phần mềm và giảm thiểu việc ứng dụng sai yêu cầu nghiệp vụ.
                                                </li>
                                          </ul>
                                    </div>
                                    <div>
                                          <h4 className="section-title">Bất cập</h4>
                                          <ul className="bullet-list">
                                                <li>
                                                      <strong>Hiểu rõ nghiệp vụ</strong>
                                                      <br />
                                                      DDD đòi hỏi phải có ít nhất một người hiểu rõ nghiệp vụ trong nhóm phát triển để đảm bảo mô hình hoá đúng yêu cầu khách hàng.
                                                      <br />
                                                      Thường thì đây là công việc chính của 1 BA giao tiếp với khách hàng nhưng đôi khi nếu không có BA thì các developers cũng phải chủ động giao tiếp để nắm rõ được nghiệp vụ
                                                </li>
                                                <li>
                                                      <strong>Learning curve cao</strong>
                                                      <br />
                                                      DDD có khá nhiều thuật ngữ chuyên dụng như ubiquitous language, entities, value objects, domain behaviors, ....
                                                      Thế nên giai đoạn đầu của dự án, dev chưa làm qua DDD bao giờ sẽ mất nhiều thời gian để tiếp học đến thời gian sẽ nhiều hơn.
                                                </li>
                                                <li>
                                                      <strong>Không phù hợp với domain đơn giản hoặc ứng dụng CRUD</strong>
                                                      <br />
                                                      Nếu những dự án CRUD đơn giản không có nhiều nghiệp vụ phức tạp thì DDD sẽ là overhead không cần thiết.
                                                      <br />
                                                      Ví dụ, một form đăng ký xin việc đơn thuần chỉ cần lưu thông tin mà không có quy tắc phức tạp, thì DDD có thể làm tăng công sức thiết kế mà không đem lại lợi ích rõ rệt.
                                                      <br />
                                                      Trong trường hợp này, những phương pháp thiết kế truyền thống (MVC, CRUD pattern) có thể hiệu quả và nhanh chóng hơn.
                                                </li>
                                                <li>
                                                      <strong>Kém hiệu quả trong các dự án kỹ thuật chuyên sâu</strong>
                                                      <br />
                                                      Đối với những dự án tập trung nhiều về kỹ thuật (hệ thống nhúng, tối ưu thuật toán, hoặc domain quá mới/vắng chuyên gia), khó xây dựng được ngôn ngữ chung mà tất cả cùng hiểu. 
                                                      Do đó, DDD trong trường hợp này sẽ không mang lại nhiều lợi ích so với chi phí bỏ ra.
                                                </li>
                                          </ul>
                                    </div>

                                    <Callout>
                                          DDD phát huy tốt ở các hệ thống doanh nghiệp có nghiệp vụ phức tạp và thay đổi thường xuyên, giúp phần mềm gắn sát với yêu cầu kinh doanh và dễ bảo trì. 
                                          Ngược lại, với các ứng dụng nhỏ, đơn giản hoặc thuần kỹ thuật, DDD có thể gây tốn kém và phức tạp hơn so với lợi ích nhận được. 
                                          Vậy nên, việc có nên áp dụng DDD hay không phụ thuộc vào tính chất và quy mô của từng dự án cụ thể
                                    </Callout>
                              </div>
                        
                              <div>
                                    <h3>WHEN</h3>
                                    <p>Vậy khi nào nên áp dụng DDD</p>
                                    <br />

                                    <div>
                                          <strong>Nên áp dụng khi </strong>
                                          <ul className="bullet-list">
                                                <li>Nghiệp vụ phức tạp, nhiều ràng buộc</li>
                                                <li>Nghiệp vụ thay đổi thường xuyên</li>
                                                <li>Hệ thống có vòng đời dài, cần bảo trì và mở rộng</li>
                                                <li>Đội ngũ sẵn sàng đầu tư thời gian để hiểu nghiệp vụ</li>
                                          </ul>
                                    </div>

                                    <div>
                                          <strong>Chưa nên hoặc không nên khi:</strong>
                                          <ul className="bullet-list">
                                                <li>Hệ thống CRUD đơn giản/</li>
                                                <li>Bài toán thiên về kỹ thuật hơn nghiệp vụ.</li>
                                                <li>Đội ngũ chưa có đủ nguồn lực để tiếp cận DDD.</li>
                                          </ul>
                                    </div>

                                    <Callout>
                                          DDD không nhất thiết phải áp dụng toàn phần. 
                                          Một cách tiếp cận hiệu quả là chỉ áp dụng DDD cho core domain, còn các phần supporting vẫn giữ cách làm đơn giản.
                                    </Callout>
                              </div>
                        </div>

                        <div>
                              <h2>Kết</h2>
                              <p>DDD không phải là “viên đạn bạc” cho mọi hệ thống, nhưng nó là một công cụ rất mạnh khi được áp dụng đúng bối cảnh.</p>
                              <p>Trong các hệ thống ERP – nơi nghiệp vụ phức tạp, thay đổi liên tục và gắn chặt với hoạt động kinh doanh – DDD giúp mã nguồn phản ánh đúng tư duy nghiệp vụ, giảm rủi ro sai lệch và tăng khả năng bảo trì về lâu dài.</p>
                              <p>Ngược lại, với các hệ thống nhỏ, đơn giản hoặc thuần kỹ thuật, DDD có thể trở thành gánh nặng không cần thiết.</p>
                              <p>Cuối cùng, việc có áp dụng DDD hay không không nên là quyết định theo xu hướng, mà là một quyết định kiến trúc dựa trên bối cảnh thực tế của dự án và đội ngũ.</p>
                              <br />
                              <p>
                                    Mình đã giới thiệu tổng quan về DDD - Domain Driven Design. Đây là 1 nội dung dài, phức tạp nên mình sẽ chia thành nhiều bài viết, và đây chỉ mới là bài viết đầu tiên.
                                    Cám ơn đã đọc bài viết của mình, mình sẽ cập nhật thêm các bài viết mới về chủ đề DDD trong thời gian tới
                              </p>
                        </div>
                  </>
            )
      }