import { Component } from '@angular/core';
import { DirectionService } from '@shared/services/direction.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './page-about-us.component.html'
})
export class PageAboutUsComponent {
  constructor(
    private translateService: TranslateService
  ) {
  }

  get currentLang() {
    return this.translateService.currentLang;
  }

  about: { [key: string]: string } = {
    uz: `
      <p><strong>Dynamics Market</strong> — bu avtomatlashtirish, asbobsozlik, energetika va elektrotexnika sohalarida yetkazib berish va texnik yechimlar taklif qiluvchi ishonchli hamkor.</p>

<p>Biz dunyo miqyosida tan olingan brendlar — Siemens, ABB, Honeywell, Endress+Hauser va boshqalar mahsulotlarini yetkazib beramiz. Mijozlarimiz orasida sanoat korxonalari, qurilish tashkilotlari, davlat muassasalari va xususiy kompaniyalar mavjud.</p>

<p>Kompaniyamiz har bir loyiha uchun individual yondashuv, to'liq hujjatlar va texnik qo'llab-quvvatlashni kafolatlaydi. Biz O'zbekiston qonunchiligi talablariga to'liq amal qilamiz va barcha yetkazib berishlar NDS bilan amalga oshiriladi.</p>

<ul>
<li><strong>Afzalliklarimiz:</strong></li>
  <li>- Tenderlarda ishtirok va davlat buyurtmalari</li>
  <li>- Sifatli uskunalar va rasmiy hujjatlar</li>
  <li>- Qisqa muddatli yetkazib berish</li>
  <li>- Texnik maslahat va loyiha qo'llab-quvvatlovi</li>
  <li>- Hamkorlikda moslashuvchan yondashuv</li>
</ul>

<strong>Dynamics Market</strong> — sizning texnologik rivojlanishdagi ishonchli hamkoringiz.
    `,
    ru: `
      <p><strong>Dynamics Market</strong> — это надёжный поставщик оборудования и решений в сферах автоматизации, КИПиА, энергетики и электротехники. Мы предлагаем продукцию от ведущих мировых брендов, включая Siemens, ABB, Honeywell, Endress+Hauser, и других.</p>

<p>Наша компания специализируется на комплексном сопровождении проектов — от подбора оборудования и технических консультаций до поставки и ввода в эксплуатацию. Мы сотрудничаем как с частными, так и с государственными заказчиками, включая промышленные предприятия, строительные организации и энергетические компании.</p>

<p>Мы придерживаемся принципов прозрачности, ответственности и индивидуального подхода. Все поставки сопровождаются полным пакетом документов и соответствуют требованиям законодательства Республики Узбекистан.</p>

<ul>
<li><strong>Наши ключевые компетенции:</strong></li>
  <li>- Участие в тендерах и госзакупках</li>
  <li>- Поставки по НДС</li>
  <li>- Оперативная логистика по всей стране</li>
  <li>- Техническое сопровождение от квалифицированных инженеров</li>
  <li>- Гибкие условия сотрудничества</li>
</ul>

<strong>Dynamics Market</strong> — мы стремимся стать вашим долгосрочным партнёром в сфере высокотехнологичных решений.
    `,
    en: `
      <p><strong>Dynamics Market</strong> is a trusted supplier of industrial equipment and solutions in automation, instrumentation, energy, and electrical engineering. We represent globally recognized brands such as Siemens, ABB, Honeywell, Endress+Hauser, and others.</p>

<p>Our company offers end-to-end project support — from technical consulting and equipment selection to delivery and commissioning. We serve both private and government clients, including industrial enterprises, construction firms, and energy companies.</p>

<p>We stand for transparency, professionalism, and a personalized approach. All deliveries include full documentation and comply with legal and tax requirements in Uzbekistan.</p>

<ul>
<li><strong>Our core strengths:</strong></li>
  <li>- Participation in tenders and public procurement</li>
  <li>- VAT-compliant deliveries</li>
  <li>- Fast nationwide logistics</li>
  <li>- Expert engineering support</li>
  <li>- Flexible terms of cooperation</li>
</ul>

<strong>Dynamics Market</strong> — your reliable partner in industrial technology and innovation.
    `
  };
}
