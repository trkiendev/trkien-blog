import Image from "next/image";
import Callout from "@/components/callout/callout";
import CodeBlock from "@/components/code/codeBlock";
import { spaceMono } from "../../font";
import blogCss from "../blog.module.css";

export default function DomainDrivenDesignEN() {
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
                              Hello everyone, I have been involved in developing an ERP project approaching Domain-Driven-Design (DDD) philosophy.
                              I have found this approach very effective for handling complex business domains.
                              So today I would like to share my understanding and experience with the methodology.

                              <br />
                              My knowledge and experience are still limited, so there may be some mistakes in my blog, I would be appreciate if you could help me to improve the content.
                        </p>
                  </div>

                  <div>
                        <h2>I. Understanding: Domain Driven Design</h2>

                        <div>
                              <h3>WHAT</h3>
                              <p className="paragraph">
                                    <strong>DDD (Domain Driven Design) </strong> is not a specific pattern or framework, but a philosophy for building software systems around the core business domain.
                                    The business domain becomes the heart of the system, where domain-specific processes are clearly defined. When organized structure well, the project approaching DDD could be much easier to maintain and upgrade overtime.
                                    <br />
                                    The concept of DDD was introduced by Eric Evans in his book “Domain-Driven Design: Tackling Complexity in the Heart of Software.”. 
                                    If you want to gain deeper understanding, this book is a good reference.
                              </p>
                              <p className="paragraph">
                                    From my personal experience, every organization has its own business processes - some are simple, while others are highly complex, depending on the scale of the organization.
                                    <br />
                                    During more than a year of experience, I have realized an important thing: business domains are almost never static; they are continuesly evolving.
                              </p>
                              <div>
                                    Business rules may change due to:
                                    <ul className="bullet-list">
                                          <li>"adjustments in business strategy."</li>
                                          <li>"optimization of operational processes."</li>
                                          <li>"or changes in government policies and regulations."</li>
                                    </ul>
                                    Therefore, it is inevitable that ERP systems must continuesly evolve to adapt to new requirements in order to properly support changing business needes.
                              </div>

                              <h4>When CRUD is no longer enough</h4>
                              In many ERP systems - especially in their early stages - applications are often built around a pure CRUD approach:
                              <blockquote>
                                    user enter data → the system persists it to the database → data is displayed to the client → user update or delete it.
                              </blockquote>                                   
                              This approach is initially simple, fast to implement, and performs well. However, as business processess grow in complexity - particularly in domain such as finance, manufacturing, and enterprise management.
                              The system gradually becomes harder to reason about and maintain if it relies solely on CRUD operations and scattered  <span className={`${spaceMono.className} ${blogCss.codeColor}`}> if-else </span> conditions.

                              <h4>A Real-World ERP Example</h4>
                              <p>
                                    One ERP system I previously worked on was designed to manage payment requests and advanced payments at a corporate group scale.
                                    <br />
                                    The business workflow was far from a simple sequence such as: <span className="highlight-blue-fg">create a form → submit for approval → get approved</span> .
                              </p>
                              <div>
                                    In reality, the process was significantly more complex: 
                                    <ul className="bullet-list">
                                          <li>Each payment request had to be based on a budget plan that was approved at the beginning of the month.</li>
                                          <li>Each budget plan had its own budget code and name, and budget codes were required to be unique within the same department.</li>
                                          <li>Each budget code was mapped to a specific cash flow category.</li>
                                          <li>Payment request was allowed to exceed the approved budget by up to 5%.</li>
                                          <li>Only after a payment request was fully approved could accountants create a disbursement order, and this step could be delayed.</li>
                                          <li>A single payment request could result in multiple outgoing payments.</li>
                                    </ul>
                                    All of these constraints can be considered business rules of the system.
                              </div>

                              <h4>The Problem</h4>
                              These business rules do not exist in a single place; instead, they are repeated accross multiple workflows.
                              <br />
                              For example:
                              <ul className="bullet-list">
                                    <li>When create a payment request → The requested amount must not be exceed the budget.</li>
                                    <li>When creating an advance payment request → the same budget constraint also applies.</li>
                              </ul>
                              <p>
                                    If, every time a business process is executed, the system queries the budget plan from the database and perform checks like the following:    
                              </p> 

<CodeBlock language="csharp"
code={`
public class BudgetPlan {
// Constructor
private BudgetPlan() {}
public BudgetPlan() ....

// Properties
public Money Amount { get; private set; }

// Domain behaviors
internal bool IsExceed(Money amount) {
      // Logic kiểm tra ngân sách.... 
}
}
`}/>

                              <p>When you need to check the remaining available budget of a 
                              <span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetPlan </span> entity in any command - such as 
                              <span className={`${spaceMono.className} ${blogCss.codeColor}`} > CreateExpensePayment </span> or 
                              <span className={`${spaceMono.className} ${blogCss.codeColor}`} > CreateAdvancePayment </span> - you simple call:
                              
                              </p>

<CodeBlock language="csharp"
code={`
var isExceed = budgetPlan.isExceed(amount);
`}/>

                              <span>Naturally, since the <span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetPlan </span> entity represents the company's budget plan, it can expose many other domain behaviors as well.</span>
                              <br />
                              For example: 
                              
<CodeBlock language="csharp"
code={`
internal BudgetPlanItem AddDetail(Guid budgetCodeId, Money amount)
`}/>

                              or

<CodeBlock language="csharp"
code={`
internal void AssignToPeriod(Guid periodId)
`}/>


                              <p>As you can see, <span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetPlan </span> 
                              now becomes a true object-oriented class that encapsulated and abstracts all business related to the company's budget planning domain </p>
                                    
<CodeBlock language="csharp"
code={`
bool IsValid(Money amount)
`}/>

                              <Callout>
                                    DDD does not focus on the database or CRUD operations. Instead, it focused on expressing business rules clearly and consistently within the codebase.
                              </Callout>
                        </div>

                        <div>
                              <h3>WHERE</h3>
                              <p>
                                    Does every ERP system need to apply Domain Driven Design ❓
                                    <br />
                                    The answer is not always. 
                                    Whether DDD should be adopted depends on the nature of the business domain, the scale of system, and the capability of the development team - rather than treating DDD as a mandatory standard.
                              </p>
                              <div>
                                    <h4 className="section-title">Strenght</h4>
                                    <ul className="bullet-list">
                                          <li>
                                                <strong>Maintainable Code</strong>
                                                <br />
                                                When business rule are encapsulated within domain entity such as (<span className={`${spaceMono.className} ${blogCss.codeColor}`} > ExpensePayment </span> and <span className={`${spaceMono.className} ${blogCss.codeColor}`} > BudgetPlan </span>), each rule exists in a single place. 
                                                <br />
                                                This prevents the same business logic from being implemented differently accross controllers, services or query handlers - an issue that often leads to poor maintainability in large ERP systems.
                                          </li>
                                          <li>
                                                <strong>Ubiquitous Language</strong>
                                                <br />
                                                By expressing business concepts and behaviors directly inside domain entities, the source code itself becomes a ling documentation of the business domai.
                                                This allows new developers to understand the business more easily and reduce the risk of miscommunication between the stakeholders such as domain experts, business analysts, and developers.
                                                <br />
                                          </li>
                                          <li>
                                                <strong>Flexible Scalability</strong>
                                                <br />
                                                In system that apply DDD, complex domain can be divide into smaller, more manageable <span className={blogCss.highlightText}>bounded context</span> following a divide-and-conquer approach.
                                                <br />
                                                Each context represents a distinct part of the business domain and can be developed and evolved independently without impacting the entire system.
                                                As a result, when business requirements change or new features are introduced, only the relevant context needs to be updated, allowing the system to adapt more effectively and scale overtime.
                                          </li>
                                          <li>
                                                <strong>Strong Support for Complex Domains</strong>
                                                <br />
                                                For large enterprise systems - such as ERP, finance or manufactoring platforms - with complex business rules, DDD enables these rules to be modeled explicity and clearly in code.
                                                <br />
                                                Because the domain model closely reflects business goals, changes to business policies (for example, adjusting budget overrun rules) can be implemented more easily.
                                                The shared language across stakeholders helps improve software quality and reduces the risk of misinterpreting business requirements.
                                          </li>
                                    </ul>
                              </div>
                              <div>
                                    <h4 className="section-title">Trade-offs and Limitations</h4>
                                    <ul className="bullet-list">
                                          <li>
                                                <strong>Deep Domain Knowledge required</strong>
                                                <br />
                                                DDD requires at least one person on the team have a strong understanding of the business domain to ensure the model accurately reflects real-world requirements.
                                                <br />
                                                This role is oftern filtered by a business analyst, but in teams without a dedicated BA, developers must proactively engage with stakeholders to acquire sufficient domain knowledge.
                                          </li>
                                          <li>
                                                <strong>Steep Learning curve</strong>
                                                <br />
                                                DDD introduces many specialized concepts and terms such as ubiquitous language, entities, value objects, and domain behaviors. 
                                                As a result, during the early stages of an project, developers who have never worked with DDD before will need to invest significant time in learning, which can slow down initial development.
                                          </li>
                                          <li>
                                                <strong>Not suitable for simple domains or CRUD based applicaitons</strong>
                                                <br />
                                                For simple CRUD-style projects with minimal business logic, DDD can introduce uncessary overhead.
                                                <br />
                                                For example, a basic job application form that only stores data with complex business rules does not benefit much from DDD.
                                                <br />
                                                In such cases, traditional design approaches (such as MVC or the CRUD pattern) are often more efficient and faster to implement.
                                          </li>
                                          <li>
                                                <strong>Less effective for highly technical projects</strong>
                                                <br />
                                                In projects that are heavily focused on technical challenges - such as embedded systesm, algorithm optimization, or domains that are very new or lack domain experts - it can be difficult to establish a shared ubiquitous language that everyone understands.
                                                <br />
                                                In these situations, DDD may not deliver sufficient value relative to its cost and complexity
                                          </li>
                                    </ul>
                              </div>

                              <Callout>
                                    DDD is most effective in enterprise systems with complex business domains that change frequently, as it helps keep the software closely aligned with business requirements and easier to maintain over time. 
                                    In contrast, for small, simple, or purely technical applications, DDD can introduce additional cost and complexity without delivering proportional benefits.
                              </Callout>
                        </div>
                  
                        <div>
                              <h3>WHEN</h3>
                              <p>So, when should Domain-Driven-Design be applied</p>
                              <br />

                              <div>
                                    <strong>recommend</strong>
                                    <ul className="bullet-list">
                                          <li>The business domain is complex and involves many constraints</li>
                                          <li>Business rule change frequently</li>
                                          <li>System has a long lifecycle and needs to be maintained and extended over time.</li>
                                          <li>The team is willing to invest time in deeply understanding the business domain.</li>
                                    </ul>
                              </div>

                              <div>
                                    <strong>not fit:</strong>
                                    <ul className="bullet-list">
                                          <li>The system is simple CRUD-based application</li>
                                          <li>The problem is more technical in nature than business-driven.</li>
                                          <li>The team does not have sufficient resources or experience to adopt DDD.</li>
                                    </ul>
                              </div>
                        </div>
                  </div>

                  <div>
                        <h2>End</h2>
                        <p>DDD is not "silver bullet" for every system, but it is a very powerful tool when applied with the right understanding and intent.</p>
                        <p>Ultimately, the decision to adopt DDD should not be driven by trends, but should be an architectural decision based on the real-world context of the project and the capabilities of the team.</p>
                        <p>
                              This article provides a high-level introduction to Domain-Driven Design (DDD). Since this is a broad and complex topic, I plan to break it down into multiple articles, and this is only the first one.
                              <br />
                              Thank you for taking the time to read this article. I will continue to share more content about DDD in future posts.
                        </p>
                  </div>
            </>
      )
}