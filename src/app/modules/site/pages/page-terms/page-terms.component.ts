import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-terms',
  templateUrl: './page-terms.component.html'
})
export class PageTermsComponent {
  constructor(
    private translateService: TranslateService
  ) {
  }

  get currentLang() {
    return this.translateService.currentLang;
  }

  terms: { [key: string]: string } = {
    uz: `
      <p>Ushbu shartnoma <strong>dynamics-market.uz</strong> sayti administratsiyasi (keyingi o'rinlarda — "Platforma") va sayt va uning xizmatlaridan foydalanadigan yuridik va jismoniy shaxslar (keyingi o'rinlarda — "Foydalanuvchilar") o'rtasidagi munosabatlarni tartibga soladi.</p>

      <h5>1. Umumiy qoidalar</h5>
      <p>Platformadan foydalanish Foydalanuvchining ushbu shartnoma shartlariga roziligini bildiradi.</p>
      <p>Agar Foydalanuvchi shartlarga rozi bo'lmasa, u Platformadan foydalanishni to'xtatishi shart.</p>
      <p>Administratsiya oldindan ogohlantirmasdan shartnomaga o'zgartirishlar kiritish huquqini o'zida saqlab qoladi.</p>

      <h5>2. Platforma tavsifi</h5>
      <p>Dynamics Market — bu uskunalar va sanoat tovarlarini qidirish, tanlash va so'rash uchun B2B marketpleys.</p>
      <p>Platforma axborot xizmatlari va ta'minotchilar bilan xaridorlar o'rtasida o'zaro ta'sir qilish vositalarini taqdim etadi.</p>

      <h5>3. Ro'yxatdan o'tish va hisoblar</h5>
      <p>To'liq funksionallikka kirish uchun Foydalanuvchi ro'yxatdan o'tishi shart.</p>
      <p>Foydalanuvchi ro'yxatdan o'tganda ishonchli ma'lumotlar taqdim etadi.</p>
      <p>Administratsiya qoidalarni buzganlik yoki noto'g'ri ma'lumot berganlik holatida hisobni bloklash huquqiga ega.</p>

      <h5>4. Tomonlarning javobgarligi</h5>
      <p>Platforma Administratsiyasi uchinchi shaxslar, jumladan ta'minotchilar va xaridorlar harakatlari uchun javobgar emas.</p>
      <p>Platforma Foydalanuvchilar o'rtasidagi bitimlar tomoni emas, agar alohida shartnomalar bilan boshqacha nazarda tutilmagan bo'lsa.</p>
      <p>Foydalanuvchilar taqiqlangan kontentni joylashtirmaslik va amaldagi qonunchilikni buzmaslik majburiyatini oladilar.</p>

      <h5>5. Intellektual mulk</h5>
      <p>Platforma dizayni, logotipi, dasturiy ta'minoti va kontentiga barcha huquqlar Administratsiyaga yoki litsenziya bo'yicha uchinchi shaxslarga tegishli.</p>
      <p>Materiallarni ruxsatsiz nusxalash va foydalanish taqiqlanadi.</p>

      <h5>6. Shaxsiy ma'lumotlar</h5>
      <p>Shaxsiy ma'lumotlarni qayta ishlash Maxfiylik siyosatiga muvofiq amalga oshiriladi.</p>
      <p>Foydalanuvchi ro'yxatdan o'tganda yoki saytdan foydalanganda o'z ma'lumotlarini qayta ishlashga rozilik beradi.</p>

      <h5>7. Kirishni cheklash</h5>
      <p>Administratsiya ushbu shartnomani buzgan holda Platformaga kirishni cheklash yoki to'xtatish huquqiga ega.</p>
      <p>Shuningdek, firibgarlik harakatlari yoki xavfsizlik tahdidlari aniqlanganida bloklash mumkin.</p>

      <h5>8. Yakuniy qoidalar</h5>
      <p>Barcha nizolar muzokaralar yo'li bilan hal qilinadi, imkonsiz bo'lgan holatda — O'zbekiston Respublikasi qonunchiligiga muvofiq.</p>
      <p>Shartnoma Platformadan birinchi foydalanish paytidan kuchga kiradi.</p>
    `,
    ru: `
      <p>Настоящее Соглашение регулирует отношения между администрацией сайта <strong>dynamics-market.uz</strong> (далее — "Платформа") и юридическими и физическими лицами (далее — "Пользователи"), использующими сайт и его сервисы.</p>

      <h5>1. Общие положения</h5>
      <p>Использование Платформы означает согласие Пользователя с условиями настоящего Соглашения.</p>
      <p>Если Пользователь не согласен с условиями, он обязан прекратить использование Платформы.</p>
      <p>Администрация оставляет за собой право вносить изменения в Соглашение без предварительного уведомления.</p>

      <h5>2. Описание Платформы</h5>
      <p>Dynamics Market — это B2B-маркетплейс для поиска, выбора и запроса оборудования и промышленных товаров.</p>
      <p>Платформа предоставляет информационные услуги и инструменты для взаимодействия между поставщиками и покупателями.</p>

      <h5>3. Регистрация и аккаунты</h5>
      <p>Для доступа к полному функционалу Пользователь обязан пройти регистрацию.</p>
      <p>Пользователь предоставляет достоверные данные при регистрации.</p>
      <p>Администрация имеет право заблокировать аккаунт в случае нарушения правил или предоставления недостоверной информации.</p>

      <h5>4. Ответственность сторон</h5>
      <p>Администрация Платформы не несёт ответственности за действия третьих лиц, включая поставщиков и покупателей.</p>
      <p>Платформа не является стороной сделок между Пользователями, если иное не предусмотрено отдельными договорами.</p>
      <p>Пользователи обязуются не размещать запрещённый контент и не нарушать действующее законодательство.</p>

      <h5>5. Интеллектуальная собственность</h5>
      <p>Все права на дизайн, лого, программное обеспечение и контент Платформы принадлежат Администрации или третьим лицам по лицензии.</p>
      <p>Копирование и использование материалов без разрешения запрещено.</p>

      <h5>6. Персональные данные</h5>
      <p>Обработка персональных данных осуществляется согласно Политике конфиденциальности.</p>
      <p>Пользователь даёт согласие на обработку своих данных при регистрации или использовании сайта.</p>

      <h5>7. Ограничение доступа</h5>
      <p>Администрация вправе ограничить или прекратить доступ к Платформе в случае нарушения настоящего Соглашения.</p>
      <p>Также возможна блокировка при обнаружении мошеннических действий или угроз безопасности.</p>

      <h5>8. Заключительные положения</h5>
      <p>Все споры решаются путём переговоров, при невозможности — в соответствии с законодательством Республики Узбекистан.</p>
      <p>Соглашение вступает в силу с момента первого использования Платформы.</p>
    `,
    en: `
      <p>This Agreement governs the relationship between the administration of the website <strong>dynamics-market.uz</strong> (hereinafter referred to as the "Platform") and legal entities and individuals (hereinafter referred to as "Users") who use the website and its services.</p>

      <h5>1. General Provisions</h5>
      <p>Use of the Platform indicates the User's agreement with the terms of this Agreement.</p>
      <p>If the User does not agree with the terms, they must stop using the Platform.</p>
      <p>The Administration reserves the right to make changes to the Agreement without prior notice.</p>

      <h5>2. Platform Description</h5>
      <p>Dynamics Market is a B2B marketplace for searching, selecting, and requesting equipment and industrial goods.</p>
      <p>The Platform provides information services and tools for interaction between suppliers and buyers.</p>

      <h5>3. Registration and Accounts</h5>
      <p>To access full functionality, the User must register.</p>
      <p>The User provides accurate data during registration.</p>
      <p>The Administration has the right to block an account in case of rule violations or providing false information.</p>

      <h5>4. Responsibility of the Parties</h5>
      <p>The Platform Administration is not responsible for the actions of third parties, including suppliers and buyers.</p>
      <p>The Platform is not a party to transactions between Users, unless otherwise provided by separate agreements.</p>
      <p>Users undertake not to post prohibited content and not to violate current legislation.</p>

      <h5>5. Intellectual Property</h5>
      <p>All rights to the design, logo, software, and content of the Platform belong to the Administration or third parties under license.</p>
      <p>Copying and using materials without permission is prohibited.</p>

      <h5>6. Personal Data</h5>
      <p>Processing of personal data is carried out in accordance with the Privacy Policy.</p>
      <p>The User gives consent to the processing of their data during registration or use of the website.</p>

      <h5>7. Access Restriction</h5>
      <p>The Administration has the right to restrict or terminate access to the Platform in case of violation of this Agreement.</p>
      <p>Blocking is also possible when fraudulent actions or security threats are detected.</p>

      <h5>8. Final Provisions</h5>
      <p>All disputes are resolved through negotiations, if impossible — in accordance with the legislation of the Republic of Uzbekistan.</p>
      <p>The Agreement comes into force from the moment of first use of the Platform.</p>
    `
  };
}
