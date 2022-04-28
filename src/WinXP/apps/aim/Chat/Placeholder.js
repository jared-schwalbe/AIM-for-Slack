import React, { useEffect, useRef } from 'react';

const Placeholder = () => {
  const ref = useRef();

  useEffect(() => {
    ref.current.querySelector('.c-scrollbar__hider').scrollTo(0, 2056);
  }, []);

  return (
    <div id="aim-chat-placeholder" className="p-workspace__primary_view_body" style={{ pointerEvents: 'none' }}>
      <div ref={ref} className="p-message_pane p-message_pane--classic-nav p-message_pane--scrollbar-float-adjustment p-message_pane--with-bookmarks-bar p-message_pane--with-bookmarks-bar-open">
        <div className="p-message_pane__banners_with_bookmarks_bar p-message_pane__banners_with_bookmarks_bar--open"></div>
        <div style={{ overflow: 'visible', height: '0px', width: '0px' }}>
          <div>
            <div className="c-virtual_list c-virtual_list--scrollbar c-message_list c-message_list--floating c-scrollbar c-scrollbar--fade" style={{ width: '457px', height: '191px' }}>
              <div role="presentation" className="c-scrollbar__hider">
                <div className="c-scrollbar__child" style={{ width: '457px' }}>
                  <div className="c-virtual_list__scroll_container" aria-label="Andrew Sloma (direct message, away)" style={{ position: 'relative', height: '2056px' }}>
                    <div className="c-virtual_list__sticky_container" style={{ top: '1040px', bottom: '198px' }}>
                      <div aria-label="Friday, April 1st Press enter to select a date to jump to." className="c-virtual_list__item--sticky c-virtual_list__item--sticky-animated c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '36px', zIndex: 199 }}>
                        <div className="c-message_list__day_divider__label c-message_list__day_divider__label--jump_to_date">
                          <button className="c-button-unstyled c-message_list__day_divider__label__pill" aria-haspopup="menu" type="button">
                          Friday, April 1st
                          <span className="margin_left_25">
                          <span data-ndw="caret-down" className="is-inline"></span>
                          </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1760px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left">
                                <button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Andrew Sloma’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}>
                                <img src="https://ca.slack-edge.com/E27SFGS2W-WE47SS0F8-6e662311dfe2-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button>
                              </div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'blue' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Andrew Sloma<span></span></a></span><a data-stringify-text="[9:27 AM]" data-ts="1648823251.678259" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:27 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">where are u flying? your racking up the miles <span className="c-emoji c-emoji__medium c-emoji--inline" delay="300"><img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/apple-medium/1f642@2x.png" alt=":slightly_smiling_face:" data-stringify-emoji=":slightly_smiling_face:" /></span></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1780px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Jared Schwalbe’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-W4F1ARS22-04b1e628fa9c-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'red' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Jared Schwalbe<span></span></a></span><a data-stringify-text="[9:27 AM]" data-ts="1648823277.738769" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:27 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">Hahah lately I feel like I’m always on a plane somewhere</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1800px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--above" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left">
                                <div className="p-message_pane_message__compact_timestamp p-message_pane_message__compact_timestamp--light p-message_pane_message__compact_timestamp--adjacent"><a data-stringify-text="[9:28 AM]" data-ts="1648823297.776729" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:28</span></a></div>
                              </div>
                              <div className="c-message_kit__gutter__right">
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">I’m visiting my girlfriend in Oregon for 2 weeks</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1820px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--above" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left">
                                <div className="p-message_pane_message__compact_timestamp p-message_pane_message__compact_timestamp--light p-message_pane_message__compact_timestamp--adjacent"><a data-stringify-text="[9:29 AM]" data-ts="1648823355.684779" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:29</span></a></div>
                              </div>
                              <div className="c-message_kit__gutter__right">
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">She works remote also and has been traveling around so I sometimes join her for a bit</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__sticky_container" style={{ top: '1858px', bottom: '178px' }}>
                      <div aria-label="Tuesday, April 12th Press enter to select a date to jump to." className="c-virtual_list__item--sticky c-virtual_list__item--sticky-animated c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '36px', zIndex: '199' }}>
                        <div className="c-message_list__day_divider__label c-message_list__day_divider__label--jump_to_date"><button className="c-button-unstyled c-message_list__day_divider__label__pill" aria-haspopup="menu" type="button">Tuesday, April 12th<span className="margin_left_25"><span data-ndw="caret-down" className="is-inline"></span></span></button></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="presentation" data-qa="virtual-list-item" style={{ top: '1858px' }}>
                      <div className="c-message_list__day_divider">
                        <div className="c-message_list__day_divider__line"></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1858px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Andrew Sloma’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-WE47SS0F8-6e662311dfe2-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'blue' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Andrew Sloma<span></span></a></span><a data-stringify-text="[4:54 PM]" data-ts="1649800494.583999" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">4:54 PM</span></a><br />
                                <div className="c-message_kit__blocks">
                                  <div className="c-message__message_blocks">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-call_block">
                                          <div className="c-message__call">
                                            <div className="c-message__body c-message__body--automated">
                                              Call<button className="c-button-unstyled c-expandable_trigger" data-qa-expandable-trigger-is-expanded="true" aria-expanded="true"><i className="c-deprecated-icon c-icon--caret-down c-deprecated-icon--inherit" aria-hidden="true"></i></button>
                                              <div data-expanded="true" data-qa-expandable-container-key="call_msg_R03B8SL7MD02">
                                                <div className="p-call_subtype" aria-label="">
                                                  <div className="p-call_subtype__header"><span className="c-missing_text c-missing_text--unknown" style={{ width: '160px' }}></span></div>
                                                  <div className="p-call_subtype__footer"><span className="c-missing_text c-missing_text--unknown" style={{ width: '160px' }}></span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__sticky_container" style={{ top: '1878px', bottom: '140px' }}>
                      <div aria-label="Friday, April 15th Press enter to select a date to jump to." className="c-virtual_list__item--sticky c-virtual_list__item--sticky-animated c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '36px', zIndex: '199' }}>
                        <div className="c-message_list__day_divider__label c-message_list__day_divider__label--jump_to_date"><button className="c-button-unstyled c-message_list__day_divider__label__pill" aria-haspopup="menu" type="button">Friday, April 15th<span className="margin_left_25"><span data-ndw="caret-down" className="is-inline"></span></span></button></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="presentation" data-qa="virtual-list-item" style={{ top: '1878px' }}>
                      <div className="c-message_list__day_divider">
                        <div className="c-message_list__day_divider__line"></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1878px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Jared Schwalbe’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-W4F1ARS22-04b1e628fa9c-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'red' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Jared Schwalbe<span></span></a></span><a data-stringify-text="[9:34 AM]" data-ts="1650033240.832049" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:34 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">Hey webex isn't loading for me, gonna restart my laptop then join scrum </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__sticky_container" style={{ top: '1916px', bottom: '60px' }}>
                      <div aria-label="Thursday, April 21st Press enter to select a date to jump to." className="c-virtual_list__item--sticky c-virtual_list__item--sticky-animated c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '36px', zIndex: '199' }}>
                        <div className="c-message_list__day_divider__label c-message_list__day_divider__label--jump_to_date"><button className="c-button-unstyled c-message_list__day_divider__label__pill" aria-haspopup="menu" type="button">Thursday, April 21st<span className="margin_left_25"><span data-ndw="caret-down" className="is-inline"></span></span></button></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="presentation" data-qa="virtual-list-item" style={{ top: '1916px' }}>
                      <div className="c-message_list__day_divider">
                        <div className="c-message_list__day_divider__line"></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1916px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Andrew Sloma’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-WE47SS0F8-6e662311dfe2-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'blue' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Andrew Sloma<span></span></a></span><a data-stringify-text="[9:30 AM]" data-ts="1650551400.746879" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:30 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">hi Jared. Can you take Erin's PD today?</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1936px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--above" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left">
                                <div className="p-message_pane_message__compact_timestamp p-message_pane_message__compact_timestamp--light p-message_pane_message__compact_timestamp--adjacent"><a data-stringify-text="[9:30 AM]" data-ts="1650551417.292579" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:30</span></a></div>
                              </div>
                              <div className="c-message_kit__gutter__right">
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">since you're secondary</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1956px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Jared Schwalbe’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-W4F1ARS22-04b1e628fa9c-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'red' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Jared Schwalbe<span></span></a></span><a data-stringify-text="[9:30 AM]" data-ts="1650551424.228089" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:30 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">Sure no problem</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1976px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Andrew Sloma’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-WE47SS0F8-6e662311dfe2-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'blue' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Andrew Sloma<span></span></a></span><a data-stringify-text="[9:30 AM]" data-ts="1650551456.649979" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:30 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">thanks</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__sticky_container" style={{ top: '1996px', bottom: '0px' }}>
                      <div aria-label="Friday, April 22nd Press enter to select a date to jump to." className="c-virtual_list__item--sticky c-virtual_list__item--sticky-animated c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '36px', zIndex: '199' }}>
                        <div className="c-message_list__day_divider__label c-message_list__day_divider__label--jump_to_date"><button className="c-button-unstyled c-message_list__day_divider__label__pill" aria-haspopup="menu" type="button">Friday, April 22nd<span className="margin_left_25"><span data-ndw="caret-down" className="is-inline"></span></span></button></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="presentation" data-qa="virtual-list-item" style={{ top: '1996px' }}>
                      <div className="c-message_list__day_divider">
                        <div className="c-message_list__day_divider__line"></div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '1996px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Jared Schwalbe’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-W4F1ARS22-04b1e628fa9c-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'red' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link ">Jared Schwalbe<span></span></a></span><a data-stringify-text="[9:36 AM]" data-ts="1650638196.548309" data-sk="tooltip_parent" className="c-link c-timestamp"><span className="c-timestamp__label">9:36 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">Hey I’m running over in another meeting — I’ll be joining scrum in a minute</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="c-virtual_list__item" role="listitem" data-qa="virtual-list-item" style={{ top: '2034px' }}>
                      <div className="c-message_kit__background p-message_pane_message__message c-message_kit__message p-message_pane_message__message--last" data-qa-unprocessed="false">
                        <div aria-roledescription="message" className="c-message_kit__hover">
                          <div className="c-message_kit__actions c-message_kit__actions--default" style={{ position: 'relative' }}>
                            <div className="c-message_kit__gutter">
                              <div className="c-message_kit__gutter__left"><button className="c-button-unstyled c-message_kit__avatar c-avatar c-avatar--interactive " aria-label="View Andrew Sloma’s Profile" aria-haspopup="menu" type="button" style={{ height: '36px', width: '36px' }}><img src="https://ca.slack-edge.com/E27SFGS2W-WE47SS0F8-6e662311dfe2-48" className="c-base_icon c-base_icon--image" role="img" style={{ height: '36px', width: '36px' }} /></button></div>
                              <div className="c-message_kit__gutter__right">
                                <span className="c-message__sender c-message_kit__sender" data-stringify-type="replace" style={{ color: 'blue' }}><a rel="noopener noreferrer" data-qa="message_sender_name" aria-expanded="false" className="c-link c-message__sender_link " tabIndex="-1">Andrew Sloma<span></span></a></span><a data-stringify-text="[9:39 AM]" data-ts="1650638361.114409" data-sk="tooltip_parent" className="c-link c-timestamp" tabIndex="-1"><span className="c-timestamp__label">9:39 AM</span></a><br />
                                <div className="c-message_kit__blocks c-message_kit__blocks--rich_text">
                                  <div className="c-message__message_blocks c-message__message_blocks--rich_text">
                                    <div className="p-block_kit_renderer">
                                      <div className="p-block_kit_renderer__block_wrapper p-block_kit_renderer__block_wrapper--first">
                                        <div className="p-rich_text_block">
                                          <div className="p-rich_text_section">ok no problem at all</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="c-scrollbar__track">
                <div className="c-scrollbar__bar" style={{ height: '50px', transform: 'translateY(-50px)' }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: '458px', height: '192px' }}></div>
          </div>
          <div className="contract-trigger"></div>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
