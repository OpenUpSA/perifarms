import { useState, useEffect, useContext } from 'react';
import { AppContext } from './AppContext';

const HomePage = () => {

    const [tab, setTab] = useState('Background');

    const { } = useContext(AppContext);

    return (
        <>
            <div className="dashboard-country_info">
                <div className="country-name"><img src="/images/zim.svg" loading="lazy" alt="" className="country-flag hide" />
                    <h1 className="country-name">Introduction</h1>
                    <div className="grid-item_bg"></div>
                </div>
            </div>
            <div data-current="Background" data-easing="ease" data-duration-in="300" data-duration-out="100" className="dashboard-content_tabs w-tabs">
                <div className="tab-menu w-tab-menu">
                    <a data-w-tab="Background" onClick={() => setTab('Background')} className={`tab-link w-inline-block w-tab-link ${tab == 'Background' && 'w--current'}`}>
                        <div className="tab-link_text">Background</div>
                        <div className="button-bg is-green"></div>
                    </a>
                    <a data-w-tab="Methodology" onClick={() => setTab('Methodology')} className={`tab-link w-inline-block w-tab-link ${tab == 'Methodology' && 'w--current'}`}>
                        <div className="tab-link_text">Methodology</div>
                        <div className="button-bg is-green"></div>
                    </a>
                </div>
                <div className="tab-contents w-tab-content">
                    <div data-w-tab="Background" className={`tab-pane w-tab-pane ${tab == 'Background' && 'w--tab-active'}`}>
                        <div className="padding-section-small">
                            <div className="grid">
                                <section id="overview" className="grid-item is-desktop-full">
                                    <div className="grid-card">
                                        <div className="grid">
                                            <div className="grid-item is-content">
                                                <h2 className="section-heading">The Peri-Farms initiative</h2>
                                                <div className="quote-wrapper">
                                                    <blockquote className="block-quote">Since 2012, Nando's has actively sourced its global requirements for African Birds Eye (ABE) chilli from small farmers through its unique procurement programme 'Nando's PERi-Farms'.</blockquote>
                                                    <div className="overlay-icon"><img alt="" loading="lazy" src="/images/chili-shine.png" /></div>
                                                </div>
                                                <p>Since 2012, Nando's has actively sourced its global requirements for African Birds Eye (ABE) chilli from small farmers through its unique procurement programme 'Nando's PERi-Farms'. The programme has afforded Nando's the opportunity to activate one of its core values within its “Changing Lives Together&#x27;&#x27; programme by playing a direct role in the procurement of ABE, which is central to the brand and many product recipes. More importantly, the direct procurement of ABE, which is very well suited for smallholder farming in Southern Africa, has created the possibility for Nando's to directly and sustainably impact rural poverty in Africa through its supply chain.</p>
                                                <p>Over the last nine years, or 'seasons', Impact Amplifier, a social impact focused accelerator and capital advisory business, blending research, impact assessments, business development services and funding to scale commercially viable social enterprises in Africa (<a href="http://www.impactamplifier.co.za/" target="_blank">www.impactamplifier.co.za</a>), has worked with Nando's to conduct annual in-field impact assessments. The purpose of these assessments is to better understand the socio-economic impact of the programme and how to further enhance its effect on smallholder farmers in <a href="/abe/zimbabwe" target="_blank">Zimbabwe</a>, <a href="/abe/malawi" target="_blank">Malawi</a> and <a href="/abe/mozambique" target="_blank">Mozambique</a>.</p>
                                                <div className="feature-country_wrap">
                                                    <h4>ABE Producing countries:</h4>
                                                    <div className="feature-country-buttons">
                                                        <a href="/abe/zimbabwe" className="button is-feature w-inline-block"><img alt="" loading="lazy" src="/assets/images/zimbabwe.svg" className="button-flag is-feature" />
                                                            <div className="button-text is-feature">Zimbabwe ABE</div>
                                                            <div className="feature-country_arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="195" height="152" viewBox="0 0 195 152" fill="none">
                                                                <path d="M2.56479 79.0724C3.09849 76.1921 3.52322 73.8704 3.98382 71.3162C6.76816 69.3773 10.1323 68.7706 14.0346 68.2725C20.9041 67.3956 27.8361 66.7514 34.5135 64.113C46.4792 59.3808 60.0379 58.3974 72.0491 53.5074C75.9835 55.0573 77.8851 49.7983 81.7922 51.263C84.5636 49.3511 87.8909 50.5099 90.9359 49.8425C94.763 49.012 98.7542 48.4392 102.659 48.3461C110.843 48.1375 119.015 48.2218 127.165 48.3849C135.017 48.5353 146.912 51.59 155.309 55.7497C158.51 57.33 161.552 59.0824 164.837 60.5506C168.104 62.0083 171.585 63.2108 174.876 64.4754C175.461 69.4424 170.496 71.8876 166.899 74.7789C162.277 78.4977 156.449 81.1164 152.023 85.2155C149.751 87.317 144.937 88.5016 141.219 88.7735C136.623 89.1067 132.348 90.7925 127.918 90.8767C123.587 90.9734 119.535 92.0987 115.341 92.6214C114.503 92.7284 113.614 92.9558 112.818 92.8801C98.5247 91.449 83.8618 93.2827 69.5189 91.8453C63.7578 91.2633 58.0293 90.5504 52.7792 89.0924C45.8468 87.1652 38.9119 85.7322 31.5244 84.9904C24.6834 84.2929 18.118 82.6735 11.1024 82.2769C8.04759 82.0968 5.30853 80.1536 2.58091 79.0704L2.56479 79.0724Z" fill="currentcolor"></path>
                                                                <path d="M183.466 66.8431C181.959 68.5485 180.746 69.9251 179.414 71.4421C177.328 71.7252 175.575 70.9248 173.632 69.8609C170.211 67.9881 166.866 65.9398 162.752 65.295C155.379 64.1422 148.957 59.9538 141.494 58.8887C140.441 56.4654 137.279 59.2487 136.201 56.8912C134.133 57.1611 133.175 55.2119 131.536 54.5651C129.479 53.7469 127.464 52.7005 125.699 51.3691C121.993 48.5876 118.421 45.6177 114.895 42.6038C111.494 39.7043 107.591 33.4516 105.72 27.7189C105.005 25.5373 104.436 23.2987 103.634 21.1609C102.835 19.0363 101.829 17.0036 100.934 14.9973C102.87 11.5195 106.142 11.6808 109.007 11.0606C112.691 10.2613 116.42 10.6161 120.185 9.49658C122.116 8.9237 124.765 9.86105 126.527 11.0081C128.704 12.4277 131.336 12.8428 133.329 14.3675C135.284 15.8483 137.57 16.5527 139.653 17.7045C140.071 17.9331 140.564 18.1004 140.882 18.4342C146.561 24.4736 153.845 28.4961 159.544 34.5575C161.83 36.9952 164.045 39.5074 165.719 42.3394C167.929 46.0803 170.358 49.4968 173.293 52.6197C176.005 55.5186 178.189 58.926 181.112 61.689C182.381 62.8971 182.732 65.1529 183.458 66.8387L183.466 66.8431Z" fill="currentcolor"></path>
                                                                <path d="M104.169 135.813C102.944 133.882 101.954 132.327 100.861 130.619C101.236 128.418 102.585 126.803 104.257 125.053C107.201 121.974 110.295 119.011 112.233 114.942C115.703 107.649 121.898 102.02 125.309 94.6155C128.056 94.0864 126.278 90.2154 128.967 89.6452C129.349 87.4652 131.593 86.9263 132.753 85.3934C134.216 83.4718 135.894 81.6444 137.776 80.1376C141.715 76.9716 145.799 73.9862 149.912 71.0568C153.873 68.2298 161.333 65.6488 167.635 65.0321C170.034 64.7938 172.444 64.718 174.827 64.381C177.196 64.0444 179.539 63.475 181.82 63.0131C184.676 65.7845 183.486 69.1004 183.202 72.1765C182.839 76.1314 181.311 79.8722 181.241 83.9831C181.204 86.0917 179.436 88.5931 177.738 90.1381C175.638 92.0459 174.396 94.6486 172.249 96.3453C170.158 98.0123 168.736 100.195 166.933 102.067C166.573 102.443 166.251 102.91 165.819 103.161C158.012 107.61 151.71 114.161 143.875 118.624C140.726 120.414 137.525 122.114 134.176 123.187C129.752 124.603 125.582 126.317 121.546 128.615C117.803 130.737 113.72 132.202 110.047 134.57C108.443 135.596 106.084 135.444 104.176 135.806L104.169 135.813Z" fill="currentcolor"></path>
                                                            </svg></div>
                                                            <div className="button-bg is-green"></div>
                                                        </a>
                                                        <a href="/abe/malawi" className="button is-feature w-inline-block"><img alt="" loading="lazy" src="/assets/images/malawi.svg" className="button-flag is-feature" />
                                                            <div className="button-text is-feature">Malawi ABE</div>
                                                            <div className="feature-country_arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="195" height="152" viewBox="0 0 195 152" fill="none">
                                                                <path d="M2.56479 79.0724C3.09849 76.1921 3.52322 73.8704 3.98382 71.3162C6.76816 69.3773 10.1323 68.7706 14.0346 68.2725C20.9041 67.3956 27.8361 66.7514 34.5135 64.113C46.4792 59.3808 60.0379 58.3974 72.0491 53.5074C75.9835 55.0573 77.8851 49.7983 81.7922 51.263C84.5636 49.3511 87.8909 50.5099 90.9359 49.8425C94.763 49.012 98.7542 48.4392 102.659 48.3461C110.843 48.1375 119.015 48.2218 127.165 48.3849C135.017 48.5353 146.912 51.59 155.309 55.7497C158.51 57.33 161.552 59.0824 164.837 60.5506C168.104 62.0083 171.585 63.2108 174.876 64.4754C175.461 69.4424 170.496 71.8876 166.899 74.7789C162.277 78.4977 156.449 81.1164 152.023 85.2155C149.751 87.317 144.937 88.5016 141.219 88.7735C136.623 89.1067 132.348 90.7925 127.918 90.8767C123.587 90.9734 119.535 92.0987 115.341 92.6214C114.503 92.7284 113.614 92.9558 112.818 92.8801C98.5247 91.449 83.8618 93.2827 69.5189 91.8453C63.7578 91.2633 58.0293 90.5504 52.7792 89.0924C45.8468 87.1652 38.9119 85.7322 31.5244 84.9904C24.6834 84.2929 18.118 82.6735 11.1024 82.2769C8.04759 82.0968 5.30853 80.1536 2.58091 79.0704L2.56479 79.0724Z" fill="currentcolor"></path>
                                                                <path d="M183.466 66.8431C181.959 68.5485 180.746 69.9251 179.414 71.4421C177.328 71.7252 175.575 70.9248 173.632 69.8609C170.211 67.9881 166.866 65.9398 162.752 65.295C155.379 64.1422 148.957 59.9538 141.494 58.8887C140.441 56.4654 137.279 59.2487 136.201 56.8912C134.133 57.1611 133.175 55.2119 131.536 54.5651C129.479 53.7469 127.464 52.7005 125.699 51.3691C121.993 48.5876 118.421 45.6177 114.895 42.6038C111.494 39.7043 107.591 33.4516 105.72 27.7189C105.005 25.5373 104.436 23.2987 103.634 21.1609C102.835 19.0363 101.829 17.0036 100.934 14.9973C102.87 11.5195 106.142 11.6808 109.007 11.0606C112.691 10.2613 116.42 10.6161 120.185 9.49658C122.116 8.9237 124.765 9.86105 126.527 11.0081C128.704 12.4277 131.336 12.8428 133.329 14.3675C135.284 15.8483 137.57 16.5527 139.653 17.7045C140.071 17.9331 140.564 18.1004 140.882 18.4342C146.561 24.4736 153.845 28.4961 159.544 34.5575C161.83 36.9952 164.045 39.5074 165.719 42.3394C167.929 46.0803 170.358 49.4968 173.293 52.6197C176.005 55.5186 178.189 58.926 181.112 61.689C182.381 62.8971 182.732 65.1529 183.458 66.8387L183.466 66.8431Z" fill="currentcolor"></path>
                                                                <path d="M104.169 135.813C102.944 133.882 101.954 132.327 100.861 130.619C101.236 128.418 102.585 126.803 104.257 125.053C107.201 121.974 110.295 119.011 112.233 114.942C115.703 107.649 121.898 102.02 125.309 94.6155C128.056 94.0864 126.278 90.2154 128.967 89.6452C129.349 87.4652 131.593 86.9263 132.753 85.3934C134.216 83.4718 135.894 81.6444 137.776 80.1376C141.715 76.9716 145.799 73.9862 149.912 71.0568C153.873 68.2298 161.333 65.6488 167.635 65.0321C170.034 64.7938 172.444 64.718 174.827 64.381C177.196 64.0444 179.539 63.475 181.82 63.0131C184.676 65.7845 183.486 69.1004 183.202 72.1765C182.839 76.1314 181.311 79.8722 181.241 83.9831C181.204 86.0917 179.436 88.5931 177.738 90.1381C175.638 92.0459 174.396 94.6486 172.249 96.3453C170.158 98.0123 168.736 100.195 166.933 102.067C166.573 102.443 166.251 102.91 165.819 103.161C158.012 107.61 151.71 114.161 143.875 118.624C140.726 120.414 137.525 122.114 134.176 123.187C129.752 124.603 125.582 126.317 121.546 128.615C117.803 130.737 113.72 132.202 110.047 134.57C108.443 135.596 106.084 135.444 104.176 135.806L104.169 135.813Z" fill="currentcolor"></path>
                                                            </svg></div>
                                                            <div className="button-bg is-green"></div>
                                                        </a>
                                                        <a href="/abe/mozambique" className="button is-feature w-inline-block"><img alt="" loading="lazy" src="/assets/images/mozambique.svg" className="button-flag is-feature" />
                                                            <div className="button-text is-feature">Mozambique ABE</div>
                                                            <div className="button-bg is-green"></div>
                                                            <div className="feature-country_arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="195" height="152" viewBox="0 0 195 152" fill="none">
                                                                <path d="M2.56479 79.0724C3.09849 76.1921 3.52322 73.8704 3.98382 71.3162C6.76816 69.3773 10.1323 68.7706 14.0346 68.2725C20.9041 67.3956 27.8361 66.7514 34.5135 64.113C46.4792 59.3808 60.0379 58.3974 72.0491 53.5074C75.9835 55.0573 77.8851 49.7983 81.7922 51.263C84.5636 49.3511 87.8909 50.5099 90.9359 49.8425C94.763 49.012 98.7542 48.4392 102.659 48.3461C110.843 48.1375 119.015 48.2218 127.165 48.3849C135.017 48.5353 146.912 51.59 155.309 55.7497C158.51 57.33 161.552 59.0824 164.837 60.5506C168.104 62.0083 171.585 63.2108 174.876 64.4754C175.461 69.4424 170.496 71.8876 166.899 74.7789C162.277 78.4977 156.449 81.1164 152.023 85.2155C149.751 87.317 144.937 88.5016 141.219 88.7735C136.623 89.1067 132.348 90.7925 127.918 90.8767C123.587 90.9734 119.535 92.0987 115.341 92.6214C114.503 92.7284 113.614 92.9558 112.818 92.8801C98.5247 91.449 83.8618 93.2827 69.5189 91.8453C63.7578 91.2633 58.0293 90.5504 52.7792 89.0924C45.8468 87.1652 38.9119 85.7322 31.5244 84.9904C24.6834 84.2929 18.118 82.6735 11.1024 82.2769C8.04759 82.0968 5.30853 80.1536 2.58091 79.0704L2.56479 79.0724Z" fill="currentcolor"></path>
                                                                <path d="M183.466 66.8431C181.959 68.5485 180.746 69.9251 179.414 71.4421C177.328 71.7252 175.575 70.9248 173.632 69.8609C170.211 67.9881 166.866 65.9398 162.752 65.295C155.379 64.1422 148.957 59.9538 141.494 58.8887C140.441 56.4654 137.279 59.2487 136.201 56.8912C134.133 57.1611 133.175 55.2119 131.536 54.5651C129.479 53.7469 127.464 52.7005 125.699 51.3691C121.993 48.5876 118.421 45.6177 114.895 42.6038C111.494 39.7043 107.591 33.4516 105.72 27.7189C105.005 25.5373 104.436 23.2987 103.634 21.1609C102.835 19.0363 101.829 17.0036 100.934 14.9973C102.87 11.5195 106.142 11.6808 109.007 11.0606C112.691 10.2613 116.42 10.6161 120.185 9.49658C122.116 8.9237 124.765 9.86105 126.527 11.0081C128.704 12.4277 131.336 12.8428 133.329 14.3675C135.284 15.8483 137.57 16.5527 139.653 17.7045C140.071 17.9331 140.564 18.1004 140.882 18.4342C146.561 24.4736 153.845 28.4961 159.544 34.5575C161.83 36.9952 164.045 39.5074 165.719 42.3394C167.929 46.0803 170.358 49.4968 173.293 52.6197C176.005 55.5186 178.189 58.926 181.112 61.689C182.381 62.8971 182.732 65.1529 183.458 66.8387L183.466 66.8431Z" fill="currentcolor"></path>
                                                                <path d="M104.169 135.813C102.944 133.882 101.954 132.327 100.861 130.619C101.236 128.418 102.585 126.803 104.257 125.053C107.201 121.974 110.295 119.011 112.233 114.942C115.703 107.649 121.898 102.02 125.309 94.6155C128.056 94.0864 126.278 90.2154 128.967 89.6452C129.349 87.4652 131.593 86.9263 132.753 85.3934C134.216 83.4718 135.894 81.6444 137.776 80.1376C141.715 76.9716 145.799 73.9862 149.912 71.0568C153.873 68.2298 161.333 65.6488 167.635 65.0321C170.034 64.7938 172.444 64.718 174.827 64.381C177.196 64.0444 179.539 63.475 181.82 63.0131C184.676 65.7845 183.486 69.1004 183.202 72.1765C182.839 76.1314 181.311 79.8722 181.241 83.9831C181.204 86.0917 179.436 88.5931 177.738 90.1381C175.638 92.0459 174.396 94.6486 172.249 96.3453C170.158 98.0123 168.736 100.195 166.933 102.067C166.573 102.443 166.251 102.91 165.819 103.161C158.012 107.61 151.71 114.161 143.875 118.624C140.726 120.414 137.525 122.114 134.176 123.187C129.752 124.603 125.582 126.317 121.546 128.615C117.803 130.737 113.72 132.202 110.047 134.57C108.443 135.596 106.084 135.444 104.176 135.806L104.169 135.813Z" fill="currentcolor"></path>
                                                            </svg></div>
                                                        </a>
                                                    </div>
                                                </div>
                                                {/* <div className="feature-country_wrap">
                                                    <h4>Cayenne Producing countries:</h4>
                                                    <div className="feature-country-buttons">
                                                        <a href="/cayenne/zimbabwe" className="button is-feature w-inline-block"><img alt="" loading="lazy" src="/images/zimbabwe.svg" className="button-flag is-feature" />
                                                            <div className="button-text is-feature">Zimbabwe Cayenne</div>
                                                            <div className="feature-country_arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="195" height="152" viewBox="0 0 195 152" fill="none">
                                                                <path d="M2.56479 79.0724C3.09849 76.1921 3.52322 73.8704 3.98382 71.3162C6.76816 69.3773 10.1323 68.7706 14.0346 68.2725C20.9041 67.3956 27.8361 66.7514 34.5135 64.113C46.4792 59.3808 60.0379 58.3974 72.0491 53.5074C75.9835 55.0573 77.8851 49.7983 81.7922 51.263C84.5636 49.3511 87.8909 50.5099 90.9359 49.8425C94.763 49.012 98.7542 48.4392 102.659 48.3461C110.843 48.1375 119.015 48.2218 127.165 48.3849C135.017 48.5353 146.912 51.59 155.309 55.7497C158.51 57.33 161.552 59.0824 164.837 60.5506C168.104 62.0083 171.585 63.2108 174.876 64.4754C175.461 69.4424 170.496 71.8876 166.899 74.7789C162.277 78.4977 156.449 81.1164 152.023 85.2155C149.751 87.317 144.937 88.5016 141.219 88.7735C136.623 89.1067 132.348 90.7925 127.918 90.8767C123.587 90.9734 119.535 92.0987 115.341 92.6214C114.503 92.7284 113.614 92.9558 112.818 92.8801C98.5247 91.449 83.8618 93.2827 69.5189 91.8453C63.7578 91.2633 58.0293 90.5504 52.7792 89.0924C45.8468 87.1652 38.9119 85.7322 31.5244 84.9904C24.6834 84.2929 18.118 82.6735 11.1024 82.2769C8.04759 82.0968 5.30853 80.1536 2.58091 79.0704L2.56479 79.0724Z" fill="currentcolor"></path>
                                                                <path d="M183.466 66.8431C181.959 68.5485 180.746 69.9251 179.414 71.4421C177.328 71.7252 175.575 70.9248 173.632 69.8609C170.211 67.9881 166.866 65.9398 162.752 65.295C155.379 64.1422 148.957 59.9538 141.494 58.8887C140.441 56.4654 137.279 59.2487 136.201 56.8912C134.133 57.1611 133.175 55.2119 131.536 54.5651C129.479 53.7469 127.464 52.7005 125.699 51.3691C121.993 48.5876 118.421 45.6177 114.895 42.6038C111.494 39.7043 107.591 33.4516 105.72 27.7189C105.005 25.5373 104.436 23.2987 103.634 21.1609C102.835 19.0363 101.829 17.0036 100.934 14.9973C102.87 11.5195 106.142 11.6808 109.007 11.0606C112.691 10.2613 116.42 10.6161 120.185 9.49658C122.116 8.9237 124.765 9.86105 126.527 11.0081C128.704 12.4277 131.336 12.8428 133.329 14.3675C135.284 15.8483 137.57 16.5527 139.653 17.7045C140.071 17.9331 140.564 18.1004 140.882 18.4342C146.561 24.4736 153.845 28.4961 159.544 34.5575C161.83 36.9952 164.045 39.5074 165.719 42.3394C167.929 46.0803 170.358 49.4968 173.293 52.6197C176.005 55.5186 178.189 58.926 181.112 61.689C182.381 62.8971 182.732 65.1529 183.458 66.8387L183.466 66.8431Z" fill="currentcolor"></path>
                                                                <path d="M104.169 135.813C102.944 133.882 101.954 132.327 100.861 130.619C101.236 128.418 102.585 126.803 104.257 125.053C107.201 121.974 110.295 119.011 112.233 114.942C115.703 107.649 121.898 102.02 125.309 94.6155C128.056 94.0864 126.278 90.2154 128.967 89.6452C129.349 87.4652 131.593 86.9263 132.753 85.3934C134.216 83.4718 135.894 81.6444 137.776 80.1376C141.715 76.9716 145.799 73.9862 149.912 71.0568C153.873 68.2298 161.333 65.6488 167.635 65.0321C170.034 64.7938 172.444 64.718 174.827 64.381C177.196 64.0444 179.539 63.475 181.82 63.0131C184.676 65.7845 183.486 69.1004 183.202 72.1765C182.839 76.1314 181.311 79.8722 181.241 83.9831C181.204 86.0917 179.436 88.5931 177.738 90.1381C175.638 92.0459 174.396 94.6486 172.249 96.3453C170.158 98.0123 168.736 100.195 166.933 102.067C166.573 102.443 166.251 102.91 165.819 103.161C158.012 107.61 151.71 114.161 143.875 118.624C140.726 120.414 137.525 122.114 134.176 123.187C129.752 124.603 125.582 126.317 121.546 128.615C117.803 130.737 113.72 132.202 110.047 134.57C108.443 135.596 106.084 135.444 104.176 135.806L104.169 135.813Z" fill="currentcolor"></path>
                                                            </svg></div>
                                                            <div className="button-bg is-green"></div>
                                                        </a>
                                                        <a href="/cayenne/malawi" className="button is-feature w-inline-block"><img alt="" loading="lazy" src="/images/malawi.svg" className="button-flag is-feature" />
                                                            <div className="button-text is-feature">Malawi Cayenne</div>
                                                            <div className="feature-country_arrow w-embed"><svg xmlns="http://www.w3.org/2000/svg" width="195" height="152" viewBox="0 0 195 152" fill="none">
                                                                <path d="M2.56479 79.0724C3.09849 76.1921 3.52322 73.8704 3.98382 71.3162C6.76816 69.3773 10.1323 68.7706 14.0346 68.2725C20.9041 67.3956 27.8361 66.7514 34.5135 64.113C46.4792 59.3808 60.0379 58.3974 72.0491 53.5074C75.9835 55.0573 77.8851 49.7983 81.7922 51.263C84.5636 49.3511 87.8909 50.5099 90.9359 49.8425C94.763 49.012 98.7542 48.4392 102.659 48.3461C110.843 48.1375 119.015 48.2218 127.165 48.3849C135.017 48.5353 146.912 51.59 155.309 55.7497C158.51 57.33 161.552 59.0824 164.837 60.5506C168.104 62.0083 171.585 63.2108 174.876 64.4754C175.461 69.4424 170.496 71.8876 166.899 74.7789C162.277 78.4977 156.449 81.1164 152.023 85.2155C149.751 87.317 144.937 88.5016 141.219 88.7735C136.623 89.1067 132.348 90.7925 127.918 90.8767C123.587 90.9734 119.535 92.0987 115.341 92.6214C114.503 92.7284 113.614 92.9558 112.818 92.8801C98.5247 91.449 83.8618 93.2827 69.5189 91.8453C63.7578 91.2633 58.0293 90.5504 52.7792 89.0924C45.8468 87.1652 38.9119 85.7322 31.5244 84.9904C24.6834 84.2929 18.118 82.6735 11.1024 82.2769C8.04759 82.0968 5.30853 80.1536 2.58091 79.0704L2.56479 79.0724Z" fill="currentcolor"></path>
                                                                <path d="M183.466 66.8431C181.959 68.5485 180.746 69.9251 179.414 71.4421C177.328 71.7252 175.575 70.9248 173.632 69.8609C170.211 67.9881 166.866 65.9398 162.752 65.295C155.379 64.1422 148.957 59.9538 141.494 58.8887C140.441 56.4654 137.279 59.2487 136.201 56.8912C134.133 57.1611 133.175 55.2119 131.536 54.5651C129.479 53.7469 127.464 52.7005 125.699 51.3691C121.993 48.5876 118.421 45.6177 114.895 42.6038C111.494 39.7043 107.591 33.4516 105.72 27.7189C105.005 25.5373 104.436 23.2987 103.634 21.1609C102.835 19.0363 101.829 17.0036 100.934 14.9973C102.87 11.5195 106.142 11.6808 109.007 11.0606C112.691 10.2613 116.42 10.6161 120.185 9.49658C122.116 8.9237 124.765 9.86105 126.527 11.0081C128.704 12.4277 131.336 12.8428 133.329 14.3675C135.284 15.8483 137.57 16.5527 139.653 17.7045C140.071 17.9331 140.564 18.1004 140.882 18.4342C146.561 24.4736 153.845 28.4961 159.544 34.5575C161.83 36.9952 164.045 39.5074 165.719 42.3394C167.929 46.0803 170.358 49.4968 173.293 52.6197C176.005 55.5186 178.189 58.926 181.112 61.689C182.381 62.8971 182.732 65.1529 183.458 66.8387L183.466 66.8431Z" fill="currentcolor"></path>
                                                                <path d="M104.169 135.813C102.944 133.882 101.954 132.327 100.861 130.619C101.236 128.418 102.585 126.803 104.257 125.053C107.201 121.974 110.295 119.011 112.233 114.942C115.703 107.649 121.898 102.02 125.309 94.6155C128.056 94.0864 126.278 90.2154 128.967 89.6452C129.349 87.4652 131.593 86.9263 132.753 85.3934C134.216 83.4718 135.894 81.6444 137.776 80.1376C141.715 76.9716 145.799 73.9862 149.912 71.0568C153.873 68.2298 161.333 65.6488 167.635 65.0321C170.034 64.7938 172.444 64.718 174.827 64.381C177.196 64.0444 179.539 63.475 181.82 63.0131C184.676 65.7845 183.486 69.1004 183.202 72.1765C182.839 76.1314 181.311 79.8722 181.241 83.9831C181.204 86.0917 179.436 88.5931 177.738 90.1381C175.638 92.0459 174.396 94.6486 172.249 96.3453C170.158 98.0123 168.736 100.195 166.933 102.067C166.573 102.443 166.251 102.91 165.819 103.161C158.012 107.61 151.71 114.161 143.875 118.624C140.726 120.414 137.525 122.114 134.176 123.187C129.752 124.603 125.582 126.317 121.546 128.615C117.803 130.737 113.72 132.202 110.047 134.57C108.443 135.596 106.084 135.444 104.176 135.806L104.169 135.813Z" fill="currentcolor"></path>
                                                            </svg></div>
                                                            <div className="button-bg is-green"></div>
                                                        </a>
                                                    </div>
                                                </div> */}
                                                <p>This site provides a detailed commercial and impact assessment of the 2021/22 ABE season in these three countries (September 2021- August 2022).  By reviewing <strong>how</strong> the programme was implemented and <strong>what impact </strong>was achieved provides Nando's with the necessary insight <strong>to both realise its success and optimise</strong> its potential going forward.</p>
                                                <div className="image-grid">
                                                    <div className="image-left"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 32vw, (max-width: 991px) 31vw, 21vw" srcSet="/assets/images/Copy-of-IMG_1294-p-500.jpg 500w, /assets/images/Copy-of-IMG_1294-p-800.jpg 800w, /assets/images/Copy-of-IMG_1294.jpg 900w" src="/assets/images/Copy-of-IMG_1294.jpg" loading="lazy" alt="" className="grid-image is-1" /></div>
                                                    <div className="images-right">
                                                        <div className="image-right_top"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 58vw, (max-width: 991px) 59vw, 38vw" srcSet="/assets/images/Copy-of-IMG_1082-p-500.jpg 500w, /assets/images/Copy-of-IMG_1082-p-800.jpg 800w, /assets/images/Copy-of-IMG_1082.jpg 900w" src="/images/Copy-of-IMG_1082.jpg" loading="lazy" alt="" className="grid-image is-2" /></div>
                                                        <div className="images-right_bottom">
                                                            <div className="image-right_bottom-left"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 27vw, (max-width: 991px) 28vw, 18vw" srcSet="/assets/images/Copy-of-IMG_1159-p-500.jpg 500w, /assets/images/Copy-of-IMG_1159-p-800.jpg 800w, /assets/images/Copy-of-IMG_1159.jpg 900w" src="/assets/images/Copy-of-IMG_1159.jpg" loading="lazy" alt="" className="grid-image is-3" /></div>
                                                            <div className="image-right_bottom-right"><img sizes="(max-width: 479px) 89vw, (max-width: 767px) 27vw, (max-width: 991px) 28vw, 18vw" srcSet="/assets/images/Copy-of-IMG_6178-p-500.jpg 500w, /assets/images/Copy-of-IMG_6178.jpg 900w" src="/assets/images/Copy-of-IMG_6178.jpg" loading="lazy" alt="" className="grid-image is-4" /></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div data-w-tab="Methodology" className={`tab-pane w-tab-pane ${tab == 'Methodology' && 'w--tab-active'}`}>
                        <div className="padding-section-small">
                            <div className="grid">
                                <section id="overview" className="grid-item is-desktop-full">
                                    <div className="grid-card">
                                        <div className="grid">
                                            <div className="grid-item is-content">
                                                <h2 className="section-heading">How we gathered our data</h2>
                                                <p>The data used for this report was gleaned from the initial baseline studies conducted in 2013 and subsequent baseline studies from 2014 to 2019 as new farming communities were added. As well as the impact assessments conducted over the last eight years. The historic data was combined with in-field interviews with farmers and country management in all three countries in 2022. In each community, information was captured regarding general demographics, infrastructure, access and the challenges related to food security, health care, energy, water, housing, education, and economic opportunities.</p>
                                                <div className="quote-wrapper">
                                                    <blockquote className="block-quote">The data used for this report was gleaned from the initial baseline studies conducted in 2013 and subsequent baseline studies from 2014 to 2019 as new farming communities were added. As well as the impact assessments conducted over the last eight years.</blockquote>
                                                    <div className="overlay-icon"><img alt="" loading="lazy" src="/assets/images/chili-shine.png" /></div>
                                                </div>
                                                <p>Additionally, this report includes data collected by Nando's country partners, over the reporting period, related to the commercial exchange with its small farmers. The commercial exchanges tracked the inputs provided to the farmers – seedlings, fertilisers and pesticides, as well as the sale of ABE.</p>
                                                <p>Data for this report was collected from September 2022 - November 2022.  Site visits were conducted in September 2022 in two communities in Malawi: Katowo and Chikwawa (Country Partner: Tropha); in October 2022 in Mozambique in five communities: Marracuene, Boane, Namaacha and Monhica and Moamba (Country Partner: MaXamba); and in November 2022 in three communities in Zimbabwe: Birchenough, Fuve and Ruware. (Country Partner: Kacholo). Additionally, commercial data was gleaned and analysed from all farmers in all three countries. </p>
                                                <p><strong>To ensure the data is comparable across country and region, various methods have been used that include converting:</strong></p>
                                                <ul role="list">
                                                    <li> ABE weight into kilograms of fresh chilli, as it is sold fresh and dry;</li>
                                                    <li>Currencies into USD;</li>
                                                    <li>Yields into .25Ha plot sizes; and</li>
                                                    <li>Net income to farmers, by subtracting farming inputs (seedlings, fertiliser and pesticides), paid labour, tools, transportation and other expenses from the farmers' gross earnings.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default HomePage;