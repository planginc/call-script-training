export interface ScriptSection {
  id: string;
  title: string;
  color?: string;
  subsections: Subsection[];
}

export interface Subsection {
  id: string;
  title: string;
  content: ContentBlock[];
}

export interface ContentBlock {
  type: 'verbatim' | 'compliance' | 'analysis' | 'transition' | 'branching' | 'regular';
  content: string;
  warning?: string;
  branchingOptions?: BranchingOption[];
}

export interface BranchingOption {
  condition: string;
  response: string;
  nextSection?: string;
}

export const scriptContent: ScriptSection[] = [
  {
    id: 'intro',
    title: 'INTRO',
    color: '#ffc642',
    subsections: [
      {
        id: 'outbound-opening',
        title: 'Outbound Opening',
        content: [
          {
            type: 'verbatim',
            content: 'Hi, is [client\'s name] available? This is [your name] from ClearOne Advantage **calling on a recorded line. You can opt out at any time.** I am contacting you per your request through [lead type] to look into options for paying off your unsecured debt.\n\nI have been assigned as your Certified Debt Consultant. We offer a number of solutions for customers like yourself. My job is to understand your goals and to help you pay off your debt. What are you looking to accomplish today?'
          },
          {
            type: 'compliance',
            content: 'COMPLIANCE REQUIREMENTS:',
            warning: 'MUST state "calling on a recorded line" and "You can opt out at any time"'
          }
        ]
      },
      {
        id: 'inbound-opening',
        title: 'Inbound Opening',
        content: [
          {
            type: 'verbatim',
            content: 'Thank you for calling ClearOne Advantage. **All calls are recorded and monitored, and you can opt out at any time.** My name is [________]. How may I assist you today?'
          },
          {
            type: 'analysis',
            content: 'ENGAGEMENT FRAMEWORK:\n- Listen. Engage. Empathize (Reflect back any specific goals, acknowledge the situation they are in)\n- "Just to make sure I understood, it sounded like you [Recap]. Is that correct?"\n- Stop. Listen. (Let them respond and provide more details)'
          }
        ]
      },
      {
        id: 'sample-call',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Demonstrating the Engagement Framework in Action'
          },
          {
            type: 'regular',
            content: '**Agent:** Hi, is Michael Thompson available?\n\n**Prospect:** Yes, this is Michael.\n\n**Agent:** This is Pam from ClearOne Advantage **calling on a recorded line. You can opt out at any time.** I\'m contacting you per your request through our website to look into options for paying off your unsecured debt.\n\n**Prospect:** I remember filling out something online last week.'
          },
          {
            type: 'analysis',
            content: '**ENGAGE:** Agent introduces herself professionally and asks about goals'
          },
          {
            type: 'regular',
            content: '**Agent:** I\'ve been assigned as your Certified Debt Consultant. We offer a number of solutions for customers like yourself. My job is to understand your goals and to help you pay off your debt. What are you looking to accomplish today?'
          },
          {
            type: 'regular',
            content: '**Prospect:** Well, honestly, I\'m just looking for help. I have about $28,000 in debt across four credit cards, and I can barely make the minimum payments anymore. I feel like I\'m drowning.'
          },
          {
            type: 'analysis',
            content: '**EMPATHIZE & REFLECT BACK:** Agent acknowledges the emotional impact and reflects back the specific details'
          },
          {
            type: 'regular',
            content: '**Agent:** I completely understand, Michael. That sounds incredibly stressful. So, just to make sure I heard you correctly, you have about $28,000 in credit card debt between 4 cards and you\'re struggling to keep up with the required minimum payments. Is that the situation?'
          },
          {
            type: 'analysis',
            content: '**STOP. LISTEN:** Agent pauses for client response to confirm understanding'
          },
          {
            type: 'regular',
            content: '**Prospect:** That\'s exactly right. It\'s keeping me up at night.'
          }
        ]
      }
    ]
  },
  {
    id: 'understand-situation',
    title: 'UNDERSTAND THEIR SITUATION',
    color: '#4574c4',
    subsections: [
      {
        id: 'core-situation-questions',
        title: 'Core Situation Questions',
        content: [
          {
            type: 'analysis',
            content: 'OBJECTIVE: Get a full understanding of the client\'s situation and financial impact'
          },
          {
            type: 'regular',
            content: '1. "What changed financially that made you inquire about consolidating your debts today?"\n2. "How long has this been going on for?"\n3. "How much has it impacted your income?"\n4. "Just to make sure I understand you; it sounds like [recap]."\n5. "Thank you for sharing [empathize with client as best as possible]. We specialize in assisting clients like yourself every day. From here I\'d like to better understand your financial situation. Let me ask you a few basic questions."'
          }
        ]
      },
      {
        id: 'sample-understand-situation',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Demonstrating Core Situation Questions in Action\n\n**LISTEN & ENGAGE:** Agent shows empathy and asks the core situation question'
          },
          {
            type: 'regular',
            content: '**Agent:** Thank you for sharing that with me, Michael. I can completely understand how stressful this must be. What changed financially that made you inquire about consolidating your debts today?'
          },
          {
            type: 'regular',
            content: '**Prospect:** I got laid off from my job about six months ago. I found new work quickly, but it pays about $800 less per month than my old job. I\'m currently only making about $3,400.00 a month.'
          },
          {
            type: 'analysis',
            content: '**RECAP & CONFIRM:** Agent uses reflective listening to repeat back what was heard'
          },
          {
            type: 'regular',
            content: '**Agent:** I see. So the financial struggle has been going on for about six months now, ever since the layoff. Is that correct?'
          },
          {
            type: 'regular',
            content: '**Prospect:** Yeah, pretty much. Six months.'
          },
          {
            type: 'analysis',
            content: '**RECAP & CONFIRM:** Agent reflects back specific financial details to ensure understanding'
          },
          {
            type: 'regular',
            content: '**Agent:** And just to clarify the impact on your income, you went from making around $4,200 a month down to $3,400 a month, which is about $800 less. Is that an accurate recap?'
          },
          {
            type: 'regular',
            content: '**Prospect:** That is exactly right.'
          },
          {
            type: 'analysis',
            content: '**EMPATHIZE & TRANSITION:** Agent acknowledges the impact and transitions to next phase'
          },
          {
            type: 'regular',
            content: '**Agent:** Thank you for sharing that with me, Michael. That\'s a significant drop, and it perfectly explains why you reached out. You\'re in the right place. We specialize in assisting clients like yourself every day. From here, I\'d like to better understand your financial situation. Let me ask you a few basic questions.'
          }
        ]
      }
    ]
  },
  {
    id: 'discovery',
    title: 'DISCOVERY',
    color: '#70ad47',
    subsections: [
      {
        id: 'standard-discovery',
        title: 'Standard Discovery Questions',
        content: [
          {
            type: 'regular',
            content: '1. "What type of financial assistance are you looking for today?"\n2. "Are you currently employed, or do you have a reliable source of income?"\n3. "Are you current or past due on your accounts?"'
          }
        ]
      },
      {
        id: 'current-clients-discovery',
        title: 'Current Clients Discovery Questions',
        content: [
          {
            type: 'regular',
            content: '1. "How much are you paying towards your unsecured debt on a monthly basis?"\n2. "Are you only paying the monthly minimums on your debt? (If more, how much more?)"\n3. "How much do you have in savings? Is that consistently what you keep in that account?"\n4. "Do you have a lump sum of money available from future commission or a relative/friend that could help pay off your debt?"\n5. "What options have you already looked into for paying off your debt?"'
          }
        ]
      },
      {
        id: 'past-due-discovery',
        title: 'Past Due Clients Discovery Questions',
        content: [
          {
            type: 'regular',
            content: '1. "How long have you been behind on your accounts?"\n2. "Do you receive creditor calls on the accounts that your behind?"\n3. "Have you been served legal paperwork on any of your accounts?"\n4. "What changed that\'s making you want to start paying these creditors again?"\n5. "What goals are you looking to accomplish by paying off your debt?"'
          }
        ]
      },
      {
        id: 'transition-credit-pull',
        title: 'Transition to Credit Pull',
        content: [
          {
            type: 'verbatim',
            content: '[client\'s name], thanks for helping me to get a good understanding of your current financial situation. I\'m going to confirm your information so that we can pull up your credit report with a soft inquiry through Experian. We will do a no cost credit analysis, which will allow me to recommend the best available options to help you resolve your debts. How does that sound? Great, let\'s get started!'
          },
          {
            type: 'regular',
            content: 'Information Collection:\n\n• Could you please provide me with your physical address?\n• Can you provide me with your date of birth?\n• Lastly, can you provide me with your social?'
          }
        ]
      },
      {
        id: 'mandatory-authorization',
        title: 'MANDATORY AUTHORIZATION (VERBATIM)',
        content: [
          {
            type: 'compliance',
            content: 'CRITICAL COMPLIANCE LANGUAGE:',
            warning: 'Must be read exactly as written - NO SUBSTITUTIONS ALLOWED'
          },
          {
            type: 'verbatim',
            content: 'Does ClearOne Advantage have your verbal authorization under the Fair Credit Reporting Act to obtain information from your personal credit report or other information from Experian to determine if you are a candidate for debt consolidation options and for fraud prevention purposes?'
          },
          {
            type: 'compliance',
            content: 'REQUIRED RESPONSE:',
            warning: 'Client must provide verbal YES - If client says no, you cannot proceed with pulling credit'
          }
        ]
      },
      {
        id: 'sample-discovery',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Demonstrating Discovery Questions in Action\n\n**ENGAGE:** Agent asks about type of financial assistance needed'
          },
          {
            type: 'regular',
            content: '**Agent:** What type of financial assistance are you looking for today?\n\n**Prospect:** I need to lower my monthly payments. I need relief, and I need a way to pay this off faster than 20 years.'
          },
          {
            type: 'analysis',
            content: '**CONFIRM EMPLOYMENT:** Agent confirms employment status and income'
          },
          {
            type: 'regular',
            content: '**Agent:** Understood. Just to confirm your employment status, your new job is permanent, Full-Time, and you\'re making $3,400.00 a month, is that correct?\n\n**Prospect:** Yes, that\'s correct.'
          },
          {
            type: 'analysis',
            content: '**ASSESS CURRENT STATUS:** Agent determines if client is current or past due'
          },
          {
            type: 'regular',
            content: '**Agent:** Great. Now, regarding your four credit card accounts, are you current or past due on those accounts?\n\n**Prospect:** I\'m current, but just barely. I\'ve been making minimum payments.'
          },
          {
            type: 'analysis',
            content: '**CURRENT CLIENT DISCOVERY:** Agent gathers payment and financial capacity information'
          },
          {
            type: 'regular',
            content: '**Agent:** Can you tell me the total amount you are paying towards your unsecured debt each month?\n\n**Prospect:** It\'s about $750 a month total just in minimum payments.\n\n**Agent:** Are you currently able to pay anything more than those monthly minimums?\n\n**Prospect:** No, $750 is all I can afford right now and I can barely afford that.\n\n**Agent:** And how much do you have set aside in savings right now?\n\n**Prospect:** I have maybe $200 in savings.\n\n**Agent:** Is that consistently what you keep in that account?\n\n**Prospect:** Sometimes it\'s less if I have an emergency pop up.\n\n**Agent:** Do you have a lump sum of money available—perhaps from a future commission or a relative—that could help pay off a chunk of this debt?\n\n**Prospect:** No, nothing like that. My family is struggling too.'
          },
          {
            type: 'analysis',
            content: '**EXPLORE ALTERNATIVES:** Agent asks about other options already considered'
          },
          {
            type: 'regular',
            content: '**Agent:** I appreciate you sharing the full picture. Lastly, have you looked into any other options for paying off your debt already?\n\n**Prospect:** I was thinking of looking into getting a personal loan to consolidate, but I wasn\'t sure if I\'d qualify given my current situation.'
          },
          {
            type: 'analysis',
            content: '**TRANSITION TO CREDIT PULL:** Agent moves to next phase with proper transition'
          },
          {
            type: 'regular',
            content: '**Agent:** Michael, thanks for helping me to get a good understanding of your current financial situation. I\'m going to confirm your information so that we can pull up your credit report with a soft inquiry through Experian. We will do a no cost credit analysis, which will allow me to recommend the best available options to help you resolve your debts. How does that sound?\n\n**Prospect:** Sounds good.\n\n**Agent:** Great, let\'s get started! Could you please provide me with your physical address?\n\n**Prospect:** 149 Main Street, Denver, Colorado 94590\n\n**Agent:** Can you provide me with your date of birth?\n\n**Prospect:** January 12, 1992\n\n**Agent:** Lastly, can you provide me with your social?\n\n**Prospect:** 101 62 7654'
          },
          {
            type: 'analysis',
            content: '**FCRA AUTHORIZATION:** Agent obtains required legal authorization'
          },
          {
            type: 'regular',
            content: '**Agent:** Does ClearOne Advantage have your verbal authorization under the Fair Credit Reporting Act to obtain information from your personal credit report or other information from Experian to determine if you are a candidate for debt consolidation options and for fraud prevention purposes?\n\n**Prospect:** Yes'
          }
        ]
      }
    ]
  },
  {
    id: 'debt-verification',
    title: 'DEBT VERIFICATION',
    color: '#ed7d31',
    subsections: [
      {
        id: 'framing-statement',
        title: 'Framing Statement',
        content: [
          {
            type: 'verbatim',
            content: 'Thank you, I will be confirming your debts with you to ensure we\'re not missing anything. Then we will review your credit report to fully understand your credit profile. Lastly, we will discuss the best available options for you to get rid of your debt. Do you have a pen and paper around to write this information down?'
          }
        ]
      },
      {
        id: 'four-step-process',
        title: '4-Step Process',
        content: [
          {
            type: 'regular',
            content: 'Step 1: Go through each account-stating creditor name and balance\nExample: "Mr./Mrs. [Client name]: \'The first account I see is a BOA credit card with a balance of $7,500. Continue down the list...\'"'
          },
          {
            type: 'regular',
            content: 'Step 2: "You have a total of __ accounts, giving us a balance of [total debt estimated] in total debt. I also show that you are currently paying out about [total minimum payments] just in required minimum monthly payments."'
          },
          {
            type: 'regular',
            content: 'Step 3: "Can you think of any accounts that are missing from this list? Often, payday loans, business debts, medical bills, and accounts like PayPal will not report to the credit bureaus."'
          },
          {
            type: 'regular',
            content: 'Step 4: "Ok wonderful, does anyone else in the household have any unsecured debt? (If yes, pull co-client credit, but you must obtain co-client\'s permission directly from the co-client, and restate credit pull disclosure)"'
          }
        ]
      },
      {
        id: 'sample-debt-verification',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Demonstrating Debt Verification Process in Action\n\n**FRAMING STATEMENT:** Agent sets expectations for the debt verification process'
          },
          {
            type: 'regular',
            content: '**Agent:** Thank you, I will be confirming your debts with you to ensure we\'re not missing anything. Then we will review your credit report to fully understand your credit profile. Lastly, we will discuss the best available options for you to get rid of your debt. Do you have a pen and paper around to write this information down?\n\n**Prospect:** Yes, I do.'
          },
          {
            type: 'analysis',
            content: '**4-STEP PROCESS - STEP 1:** Agent goes through each account stating creditor name and balance'
          },
          {
            type: 'regular',
            content: '**Agent:** Great. Based on the credit analysis, the first account I see is a Bank of America card with a balance of approximately $8,000. Next is a Chase Freedom card with a balance of about $7,500. Then there is your Discover card, where you missed that one payment, with a balance of $5,500. And finally, a Capital One card at $7,000.\n\n**Prospect:** That sounds about right.'
          },
          {
            type: 'analysis',
            content: '**4-STEP PROCESS - STEP 2:** Agent summarizes total accounts, debt amount, and monthly payments'
          },
          {
            type: 'regular',
            content: '**Agent:** Perfect. That gives us a total of **four accounts** and an estimated total debt of **$28,000**. And, as you mentioned, you are currently paying out about **$750** just in required minimum monthly payments. Does that all look accurate?\n\n**Prospect:** Yes, it does.'
          },
          {
            type: 'analysis',
            content: '**4-STEP PROCESS - STEP 3:** Agent asks about missing accounts that may not report to credit bureaus'
          },
          {
            type: 'regular',
            content: '**Agent:** Can you think of any accounts that are missing from this list? Often, payday loans, business debts, medical bills, and accounts like PayPal will not report to the credit bureaus.\n\n**Prospect:** No, I think those four cards are the only things I\'m worried about right now.'
          },
          {
            type: 'analysis',
            content: '**4-STEP PROCESS - STEP 4:** Agent asks about other household members with unsecured debt'
          },
          {
            type: 'regular',
            content: '**Agent:** Ok, wonderful. Does anyone else in the household have any unsecured debt?\n\n**Prospect:** No, it\'s just my debt.'
          },
          {
            type: 'analysis',
            content: '**CREDIT ANALYSIS FRAMEWORK:** Agent explains credit utilization impact and transitions to analysis'
          },
          {
            type: 'regular',
            content: '**Agent:** Now, let\'s go over a no-cost credit analysis that will give us better insight on how we can help you today! There are multiple factors that I see impacting clients on their credit reports. The main one is high credit utilization, which decreases your credit score and increases your interest rates. This makes it almost impossible for you to pay off the debts in a reasonable amount of time, even though you\'re making your payments on time every month. Does this sound similar to your situation with your accounts?\n\n**Prospect:** yes, it does.\n\n**Agent:** ok, let\'s take a closer look at your report and see how we can assist!'
          }
        ]
      }
    ]
  },
  {
    id: 'credit-analysis',
    title: 'CREDIT ANALYSIS',
    color: '#7030a0',
    subsections: [
      {
        id: 'credit-analysis-framework',
        title: 'Credit Analysis Framework',
        content: [
          {
            type: 'analysis',
            content: 'OBJECTIVE: GET THE CLIENT TO ACKNOWLEDGE THEIR SITUATION!'
          },
          {
            type: 'regular',
            content: 'Credit utilization: Review accounts and identify which are maxed out or close to limits. Credit Utilization refers to the amount of credit you have used compared with how much credit you have been extended by your creditors (educate consumer) (30% of your credit score)'
          },
          {
            type: 'regular',
            content: 'Payment History: If there is past due payment history, ask why. (35% of your credit score)'
          },
          {
            type: 'regular',
            content: 'Length of accounts: If you see recently opened accounts, ask why.'
          },
          {
            type: 'regular',
            content: 'Unsecured Loans: If there are unsecured loans, ask what they were used for. Calculate payments made: Calculate amount already paid to creditor (multiply payment by length of account)'
          },
          {
            type: 'regular',
            content: 'Credit Dependency: Based on debt amount, are they using debt accounts to compensate for income'
          },
          {
            type: 'regular',
            content: 'Recent Inquiries: Look at the recent inquiries section and match to see if the creditor is on the credit report'
          },
          {
            type: 'analysis',
            content: '**RECAP CREDIT:** Agent summarizes the credit situation and consequences'
          },
          {
            type: 'regular',
            content: 'Now that we\'ve reviewed your credit report, (client\'s name), I can see why you are looking for options to help you get out debt. If your debt balances are so high, and they continue to accumulate interest and fees, it can be very difficult to pay down the balances.'
          },
          {
            type: 'regular',
            content: '[Additional discussion points if needed]: If you can only afford to make the minimum payments, you may not be able to reduce the balance in a timely manner'
          },
          {
            type: 'regular',
            content: 'If you\'re unable to reduce the outstanding balance:\n\n• You will be in debt for a very long time\n• Your credit score will continue to be impacted\n• You\'ll have a difficult time putting money away for personal savings\n• You\'ll continue to be trapped in a vicious cycle of using credit cards'
          },
          {
            type: 'analysis',
            content: '**TRANSITION:** Agent transitions to debt relief options'
          },
          {
            type: 'regular',
            content: 'We\'d like to get you out of this debt cycle. We specialize in creating customized plans that help consumers reduce their balances so they can have more affordable payments and get on a path to eliminating their debt. Based on our discussion, you may be a strong candidate for some of the debt resolution options available.\n\nLet me take a moment to explain everything and provide some information on the 5 debt relief options so you feel comfortable that you\'re making a good, informed decision regarding the best option for you.'
          }
        ]
      },
      {
        id: 'credit-analysis-dialogue',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Credit Analysis Module with Michael\n\n**CREDIT ANALYSIS:** Agent explains the two main factors impacting credit report'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Michael, let\'s look at the two main factors impacting your credit report and, most importantly, keeping you in debt. The first is **Credit Utilization**. Since all four of your cards are maxed out or very close to their limits, your utilization is very high. This is a major red flag for lenders. Does that sound like what you\'re experiencing?\n\n**Speaker 2:** Yes, that\'s exactly right. They\'re all full.'
          },
          {
            type: 'analysis',
            content: '**PAYMENT HISTORY IMPACT:** Agent identifies the second major factor'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** The second major factor is **Payment History**. While you\'ve mostly been current, skipping that one Discover payment has already started to impact your history. Now that we\'ve reviewed your credit report, Michael, I can see why you\'re looking for options. When your balances are this high, and you can only afford the minimum payment of $750, most of that money goes straight to interest and fees.'
          },
          {
            type: 'analysis',
            content: '**THREE KEY CONSEQUENCES:** Agent explains the debt cycle impact with clear bullet points'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** This means:\n\n• **First**, you\'ll be trapped in debt for a very long time.\n\n• **Second**, your credit score will continue to be impacted because your balances aren\'t coming down.\n\n• **Third**, you\'ll have a difficult time putting any money away for personal savings.\n\nYou are caught in that debt cycle. Does that all make sense?'
          },
          {
            type: 'analysis',
            content: '**EMPATHY & TRANSITION:** Agent acknowledges frustration and transitions to solutions'
          },
          {
            type: 'regular',
            content: '**Speaker 2:** It does, and it\'s frustrating because I\'m trying my best.\n\n**Speaker 1:** I hear you, We specialize in creating customized plans that help consumers reduce their balances so they can have more affordable payments and get on a path to eliminating their debt. Based on our discussion, you may be a strong candidate for some of the debt resolution options available.\n\nLet me take a moment to explain everything and provide some information on the 5 debt relief options so you feel comfortable that you\'re making a good, informed decision regarding the best option for you.'
          }
        ]
      }
    ]
  },
  {
    id: 'five-options',
    title: '5 OPTIONS',
    color: '#ffff7f',
    subsections: [
      {
        id: 'introduction',
        title: 'Introduction',
        content: [
          {
            type: 'analysis',
            content: 'STRATEGIC PURPOSE: Use process of elimination to guide client to debt settlement'
          },
          {
            type: 'verbatim',
            content: 'Now that we\'ve completed your credit analysis and reviewed the issues impacting your credit profile, as well as your budget, let\'s discuss the options that can help you out of this situation. There are 5 options that anyone can use to get out of debt.'
          }
        ]
      },
      {
        id: 'option-1-pay-off',
        title: 'Option 1: Pay the Debt Off on Your Own',
        content: [
          {
            type: 'verbatim',
            content: 'The 1st option I recommend to my clients is to "pay the debt off on your own". Now in order to do so we would have to double your monthly minimum payments to {2x min. payment amount}, stop using the cards all together and still comfortably pay all of your other monthly expenses. Based on the budget we just completed, is this something you think you could manage monthly for the next 3-5 years comfortably?'
          },
          {
            type: 'branching',
            content: 'Disqualification Logic:',
            branchingOptions: [
              {
                condition: 'If no, move on',
                response: 'Most of my clients are not in a position to double their min. payments, so do you agree "paying the debt off on your own" is not your best option?'
              },
              {
                condition: 'If yes, stop and discuss',
                response: 'Continue discussion of feasibility'
              }
            ]
          }
        ]
      },
      {
        id: 'option-2-consolidation',
        title: 'Option 2: Consolidation Loan',
        content: [
          {
            type: 'verbatim',
            content: 'The next option clients typically pursue is a "Consolidation loan". This is when you apply to borrow a loan to pay off the full debt amount and then pay the loan back in a 3–5-year term. Typically, you need to have a stellar credit rating and make 3-4 times the amount of the loan you\'re looking to borrow. Based on what we reviewed in your credit profile, and the red flags we discussed, I don\'t see where you\'re going to qualify for the loan amount needed to pay off this debt off in full. Not to mention a better interest rate than you already have. I\'m also assuming you weren\'t looking to add another monthly expense to your budget today, Correct?'
          },
          {
            type: 'branching',
            content: 'Advanced Disqualification:',
            branchingOptions: [
              {
                condition: 'If no, move on',
                response: 'Even if you did qualify for the loan needed to pay the debt in full, I never recommend that you try to borrow your way our debt. Right now, your debt is spread over minimum payments for the next 15-17 years, guess what happens when you take that full debt amount and pack it into a 3-5 year period with additional interest on top? {Payment goes up} Exactly and when you start to struggle with the higher loan payment, you go back to using your cards and that\'s how you double your debt amount and then your only realistic option is "Bankruptcy" and I\'m assuming you want to avoid that, correct?'
              },
              {
                condition: 'If yes, stop and discuss',
                response: 'Continue discussion of loan feasibility'
              }
            ]
          },
          {
            type: 'verbatim',
            content: 'Does this make sense on why a consolidation loan is not your best option?'
          }
        ]
      },
      {
        id: 'option-3-credit-counseling',
        title: 'Option 3: Consumer Credit Counseling',
        content: [
          {
            type: 'verbatim',
            content: 'The last 2 options are programs that you can use to pay off your debt. The 1st program is a creditor-based program called "Consumer Credit Counseling" this program reduces the amount of interest you pay on the accounts; however, they still require you to pay the full debt amount which doesn\'t provide monthly savings. It\'s typically a 5-year program and because you have to pay the full amount in a shorter timeframe it tends to increase your monthly payments. I normally only recommend this to my clients that have less than $7,500 in debt because it\'s a more successful option at that debt amount. Do you feel Consumer Credit Counseling would be a good option for you?'
          }
        ]
      },
      {
        id: 'option-4-bankruptcy',
        title: 'Option 4: Bankruptcy',
        content: [
          {
            type: 'verbatim',
            content: 'The 4th option is "Bankruptcy". This is typically what happens when people try to borrow their way out of debt with consolidation loans and then struggle with the higher payments. When they go back to using their credit cards, they end up doubling their debt amount, and bankruptcy becomes their only realistic option. However, bankruptcy has severe long-term consequences including:'
          },
          {
            type: 'regular',
            content: '• Stays on your credit report for 7-10 years\n• Makes it extremely difficult to get credit, loans, or even rent an apartment\n• Can affect your employment opportunities\n• Requires court proceedings and legal fees\n• May require selling assets to pay creditors'
          },
          {
            type: 'verbatim',
            content: 'I\'m assuming you want to avoid bankruptcy, correct? Most of my clients do, which is why we focus on the other options that can help you get out of debt without the severe consequences of bankruptcy.'
          }
        ]
      },
      {
        id: 'option-5-debt-settlement',
        title: 'Option 5: Hardship Program "Debt Settlement"',
        content: [
          {
            type: 'verbatim',
            content: 'The last option is a hardship program that your states legislation allows you to participate in and it\'s called "Debt Settlement". This is the only option out of the 5 available that lets you reduce your monthly costs, because you\'re avoiding future compounding interest on the debt and the principal balances are negotiated to a reduction of 25-30% on average including all creditors and fees. Due to that reduction on the principal balance, it also lowers your monthly payment in half on avg. giving you monthly savings and getting you out of debt in the in a shorter period of time. Now you will need to voluntarily stop the payments directly to the creditors, which will have a negative impact on your credit score. Does that make sense?'
          },
          {
            type: 'verbatim',
            content: 'Based on the options I just went over with you, what one do you think would realistically help you pay this debt off?'
          },
          {
            type: 'branching',
            content: 'Client Response Handling:',
            branchingOptions: [
              {
                condition: 'If Debt Settlement, move on',
                response: 'I agree! Based on what you shared with me earlier in the call with your hardship and current financial situation of {No savings, Paycheck to Paycheck, needing to reduce your monthly expenses and consolidating everything into one payment} I think "Debt Settlement" is your best option as well. Let me explain how the process works in more detail….{Go into your program explanation}'
              },
              {
                condition: 'If not, stop and discuss why they think another option is better and overcome objections',
                response: 'Address their concerns and guide them back to debt settlement'
              }
            ]
          }
        ]
      },
      {
        id: 'complete-options-dialogue',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Complete 5 Options Process with Process of Elimination\n\n**OPTION 1 - PAY DEBT OFF ON YOUR OWN:** Agent presents first option with specific financial requirements'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** The first option I recommend to my clients is to **"pay the debt off on your own"**. Now in order to do so, we would have to double your monthly minimum payments to about **$1,500**, stop using the cards altogether, and still comfortably pay all of your other monthly expenses. Based on the budget we just completed, is this something you think you could manage monthly for the next 3-5 years comfortably?\n\n**Speaker 2:** No, absolutely not. I can barely afford the $750 I\'m paying now.'
          },
          {
            type: 'analysis',
            content: '**DISQUALIFICATION LOGIC:** Agent uses process of elimination to disqualify option 1'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** I understand. Most of my clients are not in a position to double their minimum payments, so do you agree that **"paying the debt off on your own"** is not your best option?\n\n**Speaker 2:** Yes, I definitely agree.'
          },
          {
            type: 'analysis',
            content: '**OPTION 2 - CONSOLIDATION LOAN:** Agent presents consolidation loan option with qualification requirements'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** The next option clients typically pursue is a **"Consolidation Loan"**. This is when you apply to borrow a loan to pay off the full debt amount and then pay the loan back in a 3-5 year term. Typically, you need to have a stellar credit rating and make 3-4 times the amount of the loan you\'re looking to borrow. Based on the credit score we reviewed in your credit profile, and the red flags we discussed, I don\'t see where you\'re going to qualify for the loan amount needed to pay off this debt in full. I\'m also assuming you weren\'t looking to add another monthly expense to your budget today, correct?\n\n**Speaker 2:** No, I am definitely not looking for another loan payment, and like I said, I already tried to get one and was denied.'
          },
          {
            type: 'analysis',
            content: '**ADVANCED DISQUALIFICATION:** Agent explains why consolidation loans often lead to more debt'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** I understand. Even if you did qualify for the loan, I never recommend trying to borrow your way out of debt. Right now, your debt is spread over minimum payments for the next 15-17 years. Guess what happens when you take that full debt amount and pack it into a 3-5 year period with additional interest on top?\n\n**Speaker 2:** The payment goes way up.\n\n**Speaker 1:** Exactly! And when you start to struggle with the higher loan payment, you go back to using your cards, and that\'s how you double your debt amount. At that point, your only realistic option is **"Bankruptcy"**, and I\'m assuming you want to avoid that, correct?\n\n**Speaker 2:** Yes, absolutely.\n\n**Speaker 1:** Does this make sense on why a consolidation loan is not your best option?\n\n**Speaker 2:** Yes, it makes perfect sense.'
          },
          {
            type: 'analysis',
            content: '**OPTION 3 - CONSUMER CREDIT COUNSELING:** Agent presents credit counseling with debt amount limitations'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** The last two options are programs you can use to pay off your debt. The first program is a creditor-based program called **"Consumer Credit Counseling"**. This program reduces the amount of interest you pay on the accounts; however, they still require you to pay the full debt amount, which doesn\'t provide monthly savings. It\'s typically a five-year program, and because you have to pay the full amount in a shorter timeframe, it tends to increase your monthly payments. I normally only recommend this to clients who have less than $7,500.00 in debt because it\'s a more successful option at that amount. Do you feel Consumer Credit Counseling would be a good option for you?\n\n**Speaker 2:** No, if the payment goes up, I can\'t do it.'
          },
          {
            type: 'analysis',
            content: '**OPTION 4 - DEBT SETTLEMENT (THE TARGET):** Agent presents debt settlement as the only viable option'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** The last option is a hardship program that your state\'s legislation allows you to participate in, and it\'s called **"Debt Settlement"**. This is the only option out of the five available that lets you reduce your monthly costs because you\'re avoiding future compounding interest on the debt, and the principal balances are negotiated to a reduction of 25-30% on average, including all creditors and fees. Due to that reduction on the principal balance, it also lowers your monthly payment in half on average, giving you monthly savings and getting you out of debt in a shorter period of time. Now, you will need to voluntarily stop the payments directly to the creditors, which will have a **negative impact on your credit score**. Does that make sense?\n\n**Speaker 2:** Yes, it does.'
          },
          {
            type: 'analysis',
            content: '**CLIENT CHOICE & AGREEMENT:** Agent gets client to choose debt settlement and confirms agreement'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Based on the options I just went over with you, what one do you think would realistically help you pay this debt off?\n\n**Speaker 2:** **Debt Settlement** seems like the only one that makes sense.\n\n**Speaker 1:** I agree! Based on what you shared with me earlier in the call—your hardship, current financial situation of needing to reduce your monthly expenses, and consolidating everything into one payment—I think **"Debt Settlement"** is your best option as well. Let me explain how the process works in more detail...'
          }
        ]
      }
    ]
  },
  {
    id: 'program-explanation',
    title: 'PROGRAM EXPLANATION',
    color: '#ff0000',
    subsections: [
      {
        id: 'step-by-step-process',
        title: 'Step-by-Step Process',
        content: [
          {
            type: 'verbatim',
            content: 'I agree and think you would be a great candidate for our Debt Settlement program to help you get out of debt and achieve your financial goals. Let me explain in more detail how the program works…'
          },
          {
            type: 'regular',
            content: 'STEP 1: "Due to your situation that we discussed earlier you voluntarily stop making payments to the creditors and will stop using the credit cards. You cannot get out of debt if you are still using the cards, right? Now, you may be thinking \'this will hurt my credit score\', and you are correct, it will have a negative impact to your credit score. You will then start making a new single monthly payment into an FDIC insured dedicated settlement account owned and controlled in your name. Your monthly program payments will accumulate in your settlement account and ultimately be used to pay your creditors and program fees as negotiations with your creditors occur."'
          },
          {
            type: 'regular',
            content: 'STEP 2: "We will begin communicating with your creditors, and during the course of negotiations explain your situation and the reason for your missed payments."'
          },
          {
            type: 'regular',
            content: 'STEP 3: "We will then start negotiating with your creditors on your behalf. Most clients see their first settlement within the first 60 to 120 days. After that, as you continue to make payments according to your plan and funds become available, we will continue to negotiate more settlements with your remaining creditors."'
          },
          {
            type: 'regular',
            content: 'STEP 4: "Once your creditor agrees to a settlement, we will contact you immediately to get your approval to start processing payments. We make no money until we\'ve negotiated a settlement with your creditor that you\'ve approved and at least one payment has been made as a result of the new settlement. We are paid on a per settlement basis and our flat fee of ______% (Missouri 18%, Iowa 18%, Idaho 28%, and all other states 25% (please verify with system) your total estimated enrolled debt amount is built into your monthly program payment with us."'
          },
          {
            type: 'regular',
            content: 'STEP 5: "When you have successfully paid as scheduled and your creditor has been paid all the newly structured payments, you should start to see improvement on your credit profile as those accounts are updated by the credit bureaus. But we urge you to use debt wisely to maintain your financial freedom once you\'ve worked so hard for it. What questions do you have for me about the program?"'
          },
          {
            type: 'verbatim',
            content: 'CLOSE: If I can get you approved for a (XX) month program at (program payment) would this be an option you would feel comfortable with to help you pay off your debt? Great!'
          },
          {
            type: 'verbatim',
            content: 'Legal Protection Services: I would now like to discuss a service that I highly recommend to all my clients called legal protection services. This is a legal club that costs $33.95 a month and has already been factored into the program payment I just quoted. This service provides added protection for your program, specifically in the event of a lawsuit. Legal Protection Services grant you access to a law firm who will represent you throughout the case and is prepared to appear in court if needed. Additional benefits include access to an online education portal full of tools and articles regarding financial health, and access to discounted legal services. Most of our clients choose to take advantage of this service in order to help with the success of the program.'
          },
          {
            type: 'verbatim',
            content: 'I\'m going to submit your file to our underwriting department so they can give us pre-approval. Also, we will do a budget to get an estimate of your monthly expenses. Our goal is to make sure you can afford your customized plan. Let\'s get started!'
          },
          {
            type: 'regular',
            content: 'Complete Budget Analysis (Make sure to go through each field within Budget Worksheet) If client\'s budget is tight review 90% rule for a term exception'
          }
        ]
      },
      {
        id: 'sample-program-explanation',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Program Explanation with Step-by-Step Process\n\n**PROGRAM INTRODUCTION:** Agent explains the debt settlement program overview'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** So let me explain exactly how the debt settlement program works:'
          },
          {
            type: 'analysis',
            content: '**STEP 1 - PAYMENT STOP & SETTLEMENT ACCOUNT:** Agent explains the first step with credit impact disclosure'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** **STEP 1:** Due to your situation that we discussed—the job loss and the lower income—you will voluntarily stop making payments to the creditors and will stop using the credit cards. You cannot get out of debt if you are still using the cards, right?\n\n**Speaker 2:** Right.\n\n**Speaker 1:** Now, you may be thinking, "this will hurt my credit score," and you are correct, it will have a negative impact. You will then start making a new single monthly payment into an **FDIC insured dedicated settlement account** owned and controlled in your name. Your monthly program payments will accumulate in this account and ultimately be used to pay your creditors and program fees as negotiations occur.\n\n**Speaker 2:** Okay, that makes sense for where the money goes.'
          },
          {
            type: 'analysis',
            content: '**STEPS 2 & 3 - CREDITOR COMMUNICATION & NEGOTIATION:** Agent explains creditor communication and negotiation timeline'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** **STEP 2:** We will begin communicating with your creditors, and during the course of negotiations, we will explain your situation and the reason for your missed payments. **STEP 3:** We will then start negotiating with your creditors on your behalf. Most clients see their first settlement within the first 60 to 120 days. After that, as you continue to make payments according to your plan and funds become available, we will continue to negotiate more settlements with your remaining creditors.\n\n**Speaker 2:** That quickly? I thought this would take forever.'
          },
          {
            type: 'analysis',
            content: '**STEP 4 - SETTLEMENT APPROVAL & FEES:** Agent explains settlement approval process and fee structure'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** **STEP 4:** Once your creditor agrees to a settlement, we will contact you immediately to get your approval to start processing payments. We make no money until we\'ve negotiated a settlement that you\'ve approved, and at least one payment has been made as a result of the new settlement. Our flat fee is **25%** of your total estimated enrolled debt amount, and this is built into your monthly program payment with us.\n\n**Speaker 2:** That\'s fair. You only get paid when I approve a result.'
          },
          {
            type: 'analysis',
            content: '**STEP 5 - CREDIT IMPROVEMENT & CLOSING:** Agent explains credit improvement timeline and asks for questions'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** **STEP 5:** When you have successfully paid as scheduled and your creditor has been paid all the newly structured payments, you should start to see improvement on your credit profile as those accounts are updated by the credit bureaus. But we urge you to use debt wisely to maintain your financial freedom once you\'ve worked so hard for it. What questions do you have for me about the program?\n\n**Speaker 2:** No, that all sounds very clear and straightforward.'
          },
          {
            type: 'analysis',
            content: '**CLOSING & PROGRAM APPROVAL:** Agent presents specific program terms and gets client agreement'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** CLOSING: If I can get you approved for a 36-month program at the estimated **$400** program payment, would this be an option you would feel comfortable with to help you finally pay off your debt?\n\n**Speaker 2:** Yes, that payment sounds completely manageable.'
          },
          {
            type: 'analysis',
            content: '**LEGAL PROTECTION SERVICES:** Agent introduces additional protection service'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Great! I would now like to discuss a service that I highly recommend to all my clients called **Legal Protection Services**. This is a legal club that costs **$29.95** a month and has already been factored into the program payment I just quoted. This service provides added protection for your program, specifically in the event of a lawsuit. Legal Protection Services grant you access to a law firm who will represent you throughout the case and is prepared to appear in court if needed. Most of our clients choose to take advantage of this service in order to help with the success of the program.\n\n**Speaker 2:** Okay, that sounds like a smart precaution, especially since I\'m stopping payments.'
          },
          {
            type: 'analysis',
            content: '**TRANSITION TO UNDERWRITING:** Agent transitions to next phase of the process'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** TRANSITION: I\'m going to submit your file to our underwriting department so they can give us pre-approval. Also, we will quickly complete a budget analysis to get an estimate of your monthly expenses. Our goal is to make absolutely sure you can afford your customized plan. Let\'s get started!'
          }
        ]
      }
    ]
  },
  {
    id: 'pre-approval',
    title: 'PRE-APPROVAL/BUDGET INSTRUCTIONS',
    subsections: [
      {
        id: 'pre-approval-checklist',
        title: 'Pre-Approval Checklist',
        content: [
          {
            type: 'regular',
            content: 'Go through Pre-Approval checklist below:\n- Double-check Banking & Identity Verification\n- Gather banking information (Routing, Account, & Mother\'s Maiden Name)\n- Confirm email, address, & secondary phone number if applicable\n- Receive any Supplemental Digits necessary for final approval\n\n[If client does not meet program requirements, discuss resolution / other options]\n[If client meets program requirements, proceed with the following]'
          }
        ]
      },
      {
        id: 'approval-announcement',
        title: 'Approval Announcement',
        content: [
          {
            type: 'verbatim',
            content: 'Congratulations! I just received your approval back from our underwriting department. We were able to get you qualified for the initial term we discussed. Based on the budget we just reviewed this is going to be an outstanding fit for you financially!'
          },
          {
            type: 'verbatim',
            content: 'We were able to approve you for a (Estimated Program Term) month term, which would put your payment at ____ per month. A friendly reminder that this payment includes your membership into legal protection services ($33.95/month).'
          },
          {
            type: 'regular',
            content: 'Do you want to match your program deposits with your pay dates? Do you get paid bi-weekly, semi-monthly, or monthly?'
          }
        ]
      },
      {
        id: 'framing-and-recap',
        title: 'Framing & Recap',
        content: [
          {
            type: 'verbatim',
            content: 'FRAMING: The last step of our process is to recap the most important terms of the program to make sure that we\'ve explained all the details of the process. After we complete the recap, I will be walking you through your enrollment agreement. Do you have access to your email right now?'
          },
          {
            type: 'regular',
            content: 'We will be using DocuSign to complete your enrollment agreement. Are you going to be using your phone or a computer to access your document? Perfect! Let\'s start the recap…'
          },
          {
            type: 'compliance',
            content: '***Go through Recap Script verbatim***',
            warning: 'Must follow recap script exactly as written'
          }
        ]
      },
      {
        id: 'credit-pull-transitions',
        title: 'Credit Pull Transitions',
        content: [
          {
            type: 'verbatim',
            content: 'Credit Pull via Transfer/Landing Page:\nTRANSITION: (client\'s name), thanks for helping me to get a good understanding of your current financial situation. It looks like we already have your credit report attached to your file. We will do a no cost credit analysis, which will allow me to recommend the best available options to help you resolve your debts. How does that sound? Great, let\'s get started!'
          },
          {
            type: 'verbatim',
            content: 'Form Debt (non-credit pull):\nTRANSITION: (client\'s name), thanks for helping me to get a good understanding of your current financial situation. I\'m going to confirm your information so that we can pull up your credit report with a soft inquiry through Experian. We will do a no cost credit analysis, which will allow me to recommend the best available options to help you resolve your debts. How does that sound? Great, let\'s get started!'
          },
          {
            type: 'regular',
            content: '• Could you please provide me with your physical address?\n• Can you provide me with your date of birth?\n• Lastly, can you provide me with your social?'
          },
          {
            type: 'compliance',
            content: 'Does ClearOne Advantage have your verbal authorization under the Fair Credit Reporting Act to obtain information from your personal credit report or other information from Experian to determine if you are a candidate for debt consolidation options and for fraud prevention purposes?',
            warning: '[Verbal YES Required – If client says no, then you can\'t proceed with pulling credit]'
          }
        ]
      },
      {
        id: 'sample-pre-approval',
        title: '📞 **Sample Call**',
        content: [
          {
            type: 'analysis',
            content: 'SAMPLE CALL TRANSCRIPT - Pre-Approval and Budget Instructions Process\n\n**VERIFICATION CHECKLIST:** Agent begins final verification process'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Michael, thanks for going through that detailed budget analysis with me. Now, before I can submit your file for final pre-approval, I need to quickly run through a verification checklist. I need to gather your banking information and confirm a few personal details.\n\n**Speaker 2:** Okay, I have my account information ready.'
          },
          {
            type: 'analysis',
            content: '**BANKING & IDENTITY VERIFICATION:** Agent collects banking and identity verification information'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Great. Can you please confirm the **routing number** and **account number** for the bank account you will be using for your settlement deposits? And for identity verification, what is your mother\'s maiden name?\n\n**Speaker 2:** The routing number is [555-6677-8], the account number is [88899911], and her maiden name is Miller.'
          },
          {
            type: 'analysis',
            content: '**CONTACT INFORMATION CONFIRMATION:** Agent confirms contact details and secondary phone'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Thank you. I also need to confirm your primary email address and physical address one last time. And do you have a secondary phone number we can have on file?\n\n**Speaker 2:** The email is [M.Thompson@webmail.com], the address is 1247 Oak Street, Denver, Colorado, 80202, and my secondary number is [720-555-1234].'
          },
          {
            type: 'analysis',
            content: '**APPROVAL PROCESS:** Agent processes information and receives approval'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Perfect. That completes the checklist. **(Pause for simulated internal process)**.\n\n**Speaker 1:** **Congratulations, Michael!** I just received your approval back from our underwriting department. We were able to get you qualified for the initial term we discussed. Based on the budget we just reviewed, this is going to be an outstanding fit for you financially!\n\n**Speaker 2:** That is fantastic news, Pam. I feel a huge weight lifted off my shoulders.'
          },
          {
            type: 'analysis',
            content: '**PROGRAM TERMS CONFIRMATION:** Agent confirms specific program terms and payment amount'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** I\'m so glad. We were able to approve you for a **36-month term**, which would put your payment at **$400 per month**. A friendly reminder that this payment includes your membership into Legal Protection Services.\n\n**Speaker 2:** Yes, $400 is absolutely doable for me.'
          },
          {
            type: 'analysis',
            content: '**PAYMENT SCHEDULING:** Agent discusses payment scheduling with client pay dates'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Excellent. Now, we just need to schedule your deposits. Do you want to match your program deposits with your pay dates? Do you get paid bi-weekly, semi-monthly, or monthly?\n\n**Speaker 2:** I get paid bi-weekly.'
          },
          {
            type: 'analysis',
            content: '**FRAMING & ENROLLMENT TRANSITION:** Agent frames the recap process and enrollment agreement'
          },
          {
            type: 'regular',
            content: '**Speaker 1:** Great. **FRAMING:** The last step of our process is to recap the most important terms of the program to make sure that we\'ve explained all the details of the process. After we complete the recap, I will be walking you through your enrollment agreement. Do you have access to your email right now?\n\n**Speaker 2:** Yes, I\'m on my computer, so I can access it immediately.\n\n**Speaker 1:** We will be using DocuSign to complete your enrollment agreement. Are you going to be using your phone or a computer to access your document?\n\n**Speaker 2:** A computer.\n\n**Speaker 1:** Perfect! Let\'s start the recap... ***Go through Recap Script verbatim***.'
          }
        ]
      }
    ]
  }
];

export const complianceRequirements = [
  {
    id: 'recorded-line',
    phrase: 'calling on a recorded line',
    context: 'Must be stated in outbound opening',
    legal: 'Required for call recording compliance'
  },
  {
    id: 'opt-out',
    phrase: 'You can opt out at any time',
    context: 'Must be stated in both outbound and inbound openings',
    legal: 'Required for TCPA compliance'
  },
  {
    id: 'fcra-authorization',
    phrase: 'Does ClearOne Advantage have your verbal authorization under the Fair Credit Reporting Act to obtain information from your personal credit report or other information from Experian to determine if you are a candidate for debt consolidation options and for fraud prevention purposes?',
    context: 'Required before credit pull',
    legal: 'FCRA compliance - must obtain verbal YES'
  }
];

export const feeStructure = {
  'Missouri': 18,
  'Iowa': 18,
  'Idaho': 28,
  'All other states': 25
};
