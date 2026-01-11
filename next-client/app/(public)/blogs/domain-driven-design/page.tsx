export default function DomainDrivenDesign() {
      return (
            <>
                  <h1 className="font-bold  text-center">Domain Driven Design</h1>
                  <br></br>
                  <p>
                        Sau 1 khoảng thời gian khá dài phát triển dự án ERP theo cách tiếp cận DDD, bản thân mình đã đọc qua nhiều tải liệu về DDD cũng như cách áp dụng vào dự án thực tiếp.
                        <br></br>
                        Mình viết bài viết này để chia sẻ hiểu biết và trải nghiệm của mình sau khi học và áp dụng DDD vào project thực tế, bài viết sẽ tập trung trả lời câu hỏi: what, why, when và các ví dụ cho từng nội dung.
                        <br></br>
                        Kiến thức và kinh nghiệm của mình cũng chưa nhiều nên có thể sẽ có những sai sót trong bài viết. Mình sẽ rất vui nếu đọc giả có thể chỉ ra và giúp mình hoàn thiện nội dung bài viết hơn.
                  </p>
                  <br></br>


                  <div>
                        <h1>Hiểu về DDĐ</h1>

                        <div>
                              <h2>WHAT</h2>
                              <p>
                                    DDD không có 1 pattern cụ thể nào cả mà nó là 1 triết lý xây dựng hệ thống phần mềm xoay quanh nghiệp vụ của doanh nghiệp
                                    <br></br>
                                    Nên DDD sẽ phụ thuộc nhiều vào kiến thức xây dựng hệ thống lập trình viên.
                              </p>

                              <p>
                                    Với mình, DDD sẽ phát huy mạnh nhất khi áp dụng vào các ứng dụng vào các hệ thống ERP của doanh nghiệp
                                    Mỗi doanh nghiệp sẽ có quy trình nghiệp vụ khác nhau, phức tạp cũng có mà đơn giản cũng có. 
                                    Trong khoảng gần 1.5 năm làm việc của mình, minh nhận ra rằng nghiệp vụ của doanh nghiệp sẽ luôn thay đổi, có thể là do sự thay đổi chiến lược kinh doanh, tối ưu hóa quy trình, hoặc là do sự thay đổi bị động từ chính sách của nhà nước
                                    Vì thế việc phải thay đổi code để đáp ứng sự thay đổi nghiệp vụ doanh nghiệp là điều tất yếu
                                    Thế nhưng nếu 1 hệ thống ERP chỉ được phát triển chỉ để phục vụ CRUD (nhập dữ liệu đầu vào, hệ thống lưu xuồng DB, hiển thị dữ liệu ra client và thực hiện các thao tác CRUD) 
                                    Ban đầu hệ thống có thể chạy mượt mà, trơn chu, tuy nhiên hệ thống sẽ trở nên phức tạp khi quy trình mở rộng, đặc biệt khi phục vụ trong các nghiệp vụ đặc thù như sản xuất
                                    <br />
                                    <span>Ví dụ</span>
                                    <br />
                                    1 hệ thống ERP mình đã từng phụ trách triển khai chính là hệ thống quản lý các đề nghị thanh toán, tạm ứng cho quy mô tập đoàn. Các đơn vị khi muốn làm đề xuất thanh toán thì phải làm tờ trình, qua các cấp duyệt thì mới được Phòng Kế toán chi tiến.
                                    Nếu trước đây các đề xuất này làm trên giấy và ký sống thì nay phải được số hóa trên 1 hệ thống ERP. Và câu chuyện sẽ không đơn giản chỉ là làm form trình kỳ, gửi form trình ký dến user duyệt và user submit duyệt là xong.
                                    Mỗi đề xuất thanh toán phải dựa trên kế hoạch ngân sách đã được duyệt từ đầu tháng, mỗi kế hoạch ngân sách phải có mã ngân sách và tên ngân sách. Mỗi phòng ban phải tạo kế hoạch ngân sách và không được phép có trùng 2 mã ngân sách.
                                    Mỗi mã ngân sách lại phải tham chiếu đến mã dòng tiền đi. Đề nghị thanh toán được phép vượt 5% kế hoạch ngân sách. Khi đề nghị thanh toán được duyệt hoàn toàn thì phải đợi Kế toán tạo lệnh cho khoản tiền chi, được phép tạo trễ, mỗi đề nghị thanh toán lại có thể tạo nhiều hơn 1 khoản tiền đi.
                                    <br />
                                    Những quy định trên mình sẽ gọi là 1 rule và trong hệ thống thanh toán mình xây dựng thì có rất nhiều rule ràng buộc giữa Đề nghị thanh toán, ngân sách, user tạo đề nghị, user xem xét, user phê duyệt, kế toán, ....
                                    Vậy hệ thống bắt buộc phải hiện thực hóa toàn bộ rule này, mỗi rule có thể xuất hiện ở nhiều quy trình như khi tạo đề xuất thanh toán thì không được phép vượt ngân sách, khi tạo đề xuất tạm ứng thì cũng không được phép vượt ngân sách.
                                    Vậy bạn sẽ gọi rule này mỗi khi có 1 request cần đến nó, và sẽ tệ nếu mỗi lần tạo thanh toán bạn lại phải tìm record budgetPlan tương ứng trong database rồi thực hiện so sánh <span>{`if (expenseRequest.Amount > budgetPlan.Amount)`}</span> đúng không ?
                                    Lúc này ta coi <span>{`if (expenseRequest.Amount > budgetPlan.Amount)`}</span> sẽ là 1 hàm nghiệp vụ và đưa vào class entity BudgetPlan
                                    <span>{`internal bool isValid(Money amount)`}</span>
                                    và mỗi lần cần xác thực tiền thanh toán có vượt ngân sách không thì ta chỉ gọi hàm <span>{`isValid()`}</span> của entity BudgetPlan để xác thực.

                              </p>

                              <p>
                                    Vậy lúc này ta sẽ coi 1 entity BudgetPlan là 1 domain nghiệp vụ có các hàm nghiệp vụ ràng buộc rõ ràng. Các nghiệp vụ cần tương tác với BudgetPlan đều phải gọi các hàm nghiệp vụ của class.
                                    class BudgetPlan này sẽ tương tác nhiều với class khác như ExpensePayment (đề nghị thanh toán), AdvancePayment (đề nghị tạm ứng), BudgetTransaction (ghi nhận giao dịch), ... nhiều class khác trong tương lai nếu hệ thống cần phải mở rộng hoặc thay đổi nghiệp vụ.
                                    Vậy là bạn đọc đã có thể hiểu sơ sơ về khái niệm domain trong DDD rồi. Mình sẽ đi sâu hơn về khái niệm này trong phần sau.
                              </p>
                        </div>

                        <div>
                              <span>WHERE</span>
                              <br />
                              <p>
                                    Vậy có phải hệ thống ERP nào cũng nên áp dụng DDD ?
                                    Không phải lúc nào cũng áp dụng DDD cho các hệ thống ERP. Để quyết định xem có nên áp dụng DDD hay không thì cần phải biết được ưu và nhược của DDD
                              </p>
                              <br />
                              <p>
                                    <span>Điểm mạnh</span>
                                    <br />
                                    <span><strong>Code dễ bảo trì</strong>DDD tập trung trừu tượng hóa nghiệp vụ vào 1 class domain entity như ExpensePayment, BugdetPlan
                                    nên toàn bộ logic nghiệp vụ sẽ tập trung vào 1 class duy nhất thay vì nằm rải rác ở nhiều nơi (Đây là lý thuyết OOP). 
                                    Qua đó không chỉ giúp tổ chức code gọn gàng mà còn giúp số hóa nghiệp vụ dễ dàng</span>
                                    <br />
                                    <span><strong>Ngôn ngữ chung: </strong>Toàn bộ chi tiết, thao tác nghiệp vụ sẽ được diễn giải bên trong class domain nên có thể dễ dàng hình dung nghiệp vụ qua class domain này, nhờ đó mà các lập trình viên join dự án có thể hiểu nghiệp vụ 
                                    và giao tiếp với các domain expert hay yêu cầu của khách hàng {`giảm rủi ro hiểu sai nghiệp vụ giữa các bên`} dẫn đến kết quả không như ý</span>
                                    <br />
                                    <span><strong>Khả năng mở rộng linh hoạt: </strong>Trong các hệ thống áp dụng DDD, 1 nghiệp vụ lớn có thể chia thành nhiều nghiệp vụ nhỏ: bounded context để giảm độ phức tạp (giống với ý tưởng chia để trị: divide & conquere)
                                    Mỗi context đảm nhận một phần nghiệp vụ riêng biệt, giúp quản lý và phát triển độc lập từng phần mà không ảnh hưởng toàn cụ. Vì vậy mà nếu khi nghiệp vụ có sự thay đổi hoặc cần mở rộng thì , chỉ cần cập nhật phần liên quan mà hệ thống tổng thể ít bị ảnh hưởng. 
                                    Khả năng này làm cho hệ thống dễ thích ứng với yêu cầu mới và mở rộng quy mô (scalability) hiệu quả hơn</span>
                                    <br />
                                    <span><strong>Đáp ứng tốt nghiệp vụ phức tạp: </strong> trong các ứng dụng doanh nghiệp lớn (ERP, tài chính, sản xuất…) có nhiều quy tắc nghiệp vụ phức tạp, DDD cho phép biểu diễn rõ ràng các luật này trên mã nguồn. 
                                    Mô hình nghiệp vụ được thiết kế tỉ mỉ giúp phần mềm gắn sát mục tiêu kinh doanh nên khi cần thay đổi nghiệp vụ (ví dụ thay đổi quy tắc vượt ngân sách), DDD giúp việc cập nhật mã nguồn trở nên dễ dàng hơn nhờ tất cả liên quan đều hiểu cùng ngôn ngữ chung
                                    Điều này nâng cao chất lượng phần mềm và giảm thiểu việc ứng dụng sai yêu cầu nghiệp vụ.</span>
                              </p>
                              <br />
                              <p>
                                    <span>Bất cập</span>
                                    <span><strong>Hiểu rõ nghiệp vụ</strong>DDD đòi hỏi phải có ít nhất một người hiểu rõ nghiệp vụ trong nhóm phát triển để đảm bảo mô hình hoá đúng yêu cầu khách hàng.
                                    Thường thì đây là công việc chính của 1 BA giao tiếp với khách hàng nhưng đôi khi nếu không có BA thì các developers cũng phải chủ động giao tiếp để nắm rõ được nghiệp vụ</span>
                                    <br />
                                    <span><strong>Learning curve cao: </strong>DDD có khá nhiều thuật ngữ chuyên dụng như ubiquitous language, entities, value objects, domain behaviors, ....
                                    Thế nên giai đoạn đầu của dự án sẽ mất nhiều thời gian để tiếp cận dẫn đến chi phí dự án sẽ cao hơn</span>
                                    <br />
                                    <span><strong>Không phù hợp với domain đơn giản hoặc ứng dụng CRUD: </strong>Nếu những dự án CRUD đơn giản không có nhiều nghiệp vụ phức tạp thì DDD sẽ là overhead không cần thiết.
                                    Ví dụ, một form đăng ký xin việc đơn thuần chỉ cần lưu thông tin mà không có quy tắc phức tạp, thì DDD có thể làm tăng công sức thiết kế mà không đem lại lợi ích rõ rệt.
                                    Trong trường hợp này, những phương pháp thiết kế truyền thống (MVC, CRUD pattern) có thể hiệu quả và nhanh chóng hơn.</span>
                                    <br/>
                                    <span><strong>Kém hiệu quả trong các dự án kỹ thuật chuyên sâu: </strong>Đối với những dự án tập trung nhiều về kỹ thuật (hệ thống nhúng, tối ưu thuật toán, hoặc domain quá mới/vắng chuyên gia), khó xây dựng được ngôn ngữ chung mà tất cả cùng hiểu. 
                                    Do đó, DDD trong trường hợp này sẽ không mang lại nhiều lợi ích so với chi phí bỏ ra</span>
                                    <br />
                              </p>
                              <br />
                              <p>
                                    Tóm lại, DDD phát huy tốt ở các hệ thống doanh nghiệp có nghiệp vụ phức tạp và thay đổi thường xuyên, giúp phần mềm gắn sát với yêu cầu kinh doanh và dễ bảo trì. 
                                    Ngược lại, với các ứng dụng nhỏ, đơn giản hoặc thuần kỹ thuật, DDD có thể gây tốn kém và phức tạp hơn so với lợi ích nhận được. 
                                    Việc có nên áp dụng DDD hay không phụ thuộc vào tính chất và quy mô của từng dự án cụ thể
                              </p>
                        </div>
                  
                        <div>
                              <h2>WHEN</h2>
                              <p>
                                    Với mình, DDD sẽ phát huy tốt nhất khi áp dụng vào các ứng dụng vào các hệ thống ERP của doanh nghiệp
                                    Mỗi doanh nghiệp sẽ có quy trình nghiệp vụ khác nhau, phức tạp cũng có mà đơn giản cũng có. 
                                    Trong khoảng gần 1.5 năm làm việc của mình, minh nhận ra rằng nghiệp vụ của doanh nghiệp sẽ luôn thay đổi, có thể là do sự thay đổi chiến lược kinh doanh, tối ưu hóa quy trình, hoặc là do sự thay đổi bị động từ chính sách của nhà nước
                                    Vì thế việc phải thay đổi code để đáp ứng sự thay đổi nghiệp vụ doanh nghiệp là điều tất yếu
                                    Và sẽ là con ác mộng nếu nghiệp vụ chỉ được thể hiện qua document và không thể hiện rõ ràng qua code.
                                    Vậy nên có thể nói DDD là cách chúng ta thể hiện được các rule nghiệp vụ, mối quan hệ giữa các domain với nhau qua code. Các lập trình viên khác sau này join hệ thống bên cạnh việc đọc tài liệu thì cũng có thể hiểu được nghiệp vụ thông qua code
                                    Điều này còn giúp code của project thống nhất
                              </p>
                        </div>
                        
                        <div>
                              <p>Mình đã giới thiệu tổng quan về DDD - Domain Driven Design. Đây là 1 nội dung dài, phức tạp nên mình sẽ chia thành nhiều bài viết.
                                    Cám ơn đã đọc bài viết của mình, mình sẽ cập nhật thêm các bài viết mới về DDD trong thời gian tới
                              </p>
                        </div>
                  </div>
            </>
      )
}